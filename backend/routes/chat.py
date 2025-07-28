import os
import json

from pydantic import BaseModel
from openai import AsyncOpenAI
from dotenv import load_dotenv
from typing import List, Dict, Any
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse

from models.chat import Chat
from database import SessionLocal

from utils.counter import prompt_counter

MAX_PROMPTS_PER_SESSION = 10

load_dotenv()

router = APIRouter()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ChatMessage(BaseModel):
    role: str
    content: str
    id: str = None


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


async def stream_text(messages: List[Dict[str, Any]], user_id: int):
    from database import SessionLocal

    openai_messages = [{"role": msg["role"],
                        "content": msg["content"]} for msg in messages]

    stream = await client.chat.completions.create(
        stream=True,
        model="gpt-3.5-turbo",
        messages=openai_messages
    )

    db = SessionLocal()
    assistant_content = ""

    try:
        async for chunk in stream:
            for choice in chunk.choices:
                if choice.finish_reason == "stop":
                    yield 'e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0},"isContinued":false}\n'
                    continue

                if choice.delta.content:
                    content = choice.delta.content
                    assistant_content += content
                    yield f'0:{json.dumps(content)}\n'
    finally:
        if assistant_content:
            assistant_message = Chat(
                user_id=user_id,
                role="assistant",
                content=assistant_content
            )
            db.add(assistant_message)
            db.commit()

        db.close()


@router.post("/chat")
async def chat_endpoint(request: Request):
    try:
        data = await request.json()
        prompt = data.get("prompt", "")
        messages = data.get("messages", [])
        user_id = data.get("user_id", None)

        if user_id not in prompt_counter:
            prompt_counter[user_id] = 0

        if prompt_counter[user_id] >= MAX_PROMPTS_PER_SESSION:
            return JSONResponse(
                status_code=403,
                content={
                    "message": f"Prompt limit reached (max {MAX_PROMPTS_PER_SESSION})"}
            )

        prompt_counter[user_id] += 1

        db = SessionLocal()

        chat = Chat(
            role="user",
            content=prompt,
            user_id=user_id,
        )

        db.add(chat)
        db.commit()
        db.close()

        response = StreamingResponse(
            stream_text(messages, user_id=user_id),
            media_type="text/plain",
            headers={
                "Connection": "keep-alive",
                "Cache-Control": "no-cache",
                "x-vercel-ai-data-stream": "v1"
            }
        )

        return response

    except Exception as e:
        print(f"Chat error: {e}")

        async def error_stream():
            yield f'e:{{"finishReason":"error","error":"{str(e)}"}}\n'

        return StreamingResponse(
            error_stream(),
            media_type="text/plain"
        )


@router.get("/chat/{user_id}")
def get_user_chats(user_id: int):
    db = SessionLocal()

    try:
        chats = db.query(Chat).filter(Chat.user_id == user_id).order_by(
            Chat.created_at.asc()).all()

        result = [
            {
                "id": chat.id,
                "role": chat.role,
                "content": chat.content,
                "created_at": chat.created_at.isoformat()
            }
            for chat in chats
        ]

        return JSONResponse(content=result)

    finally:
        db.close()
