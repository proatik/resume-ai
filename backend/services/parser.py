import os
import asyncio

from pathlib import Path
from dotenv import load_dotenv
from vlmrun.client import VLMRun
from vlmrun.client.types import PredictionResponse

from models.resume import Resume
from database import SessionLocal


load_dotenv()

client = VLMRun(api_key=os.getenv("VLMRUN_API_KEY"))


async def run_parser(user_id: int, file_path: str, queue: asyncio.Queue):
    try:
        await queue.put({
            "done": False,
            "status": "started"
        })

        response: PredictionResponse = await asyncio.to_thread(
            client.document.generate,
            file=Path(file_path),
            domain="document.resume",
        )

        if response.status == "completed":
            db = SessionLocal()

            resume = Resume(
                user_id=user_id,
                parsed_data=response.response
            )

            db.add(resume)
            db.commit()
            db.close()

            await queue.put({
                "done": True,
                "status": "completed",
                "result": response.response
            })

    except asyncio.CancelledError:
        print("Shutting down gracefully")

    except Exception as e:
        await queue.put({
            "status": "failed",
            "error": str(e),
            "done": True,
        })
