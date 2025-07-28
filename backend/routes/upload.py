import os
import uuid
import json
import asyncio
import aiofiles

from fastapi.responses import JSONResponse
from fastapi import APIRouter, UploadFile, File
from sse_starlette.sse import EventSourceResponse

from services.parser import run_parser
from utils.queue import progress_queues

from models.resume import Resume
from database import SessionLocal

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/resume")


@router.post("/upload/{user_id}")
async def upload_file(user_id: int, file: UploadFile = File(...)):
    task_id = str(uuid.uuid4())

    file_location = os.path.join(UPLOAD_DIR, file.filename)

    async with aiofiles.open(file_location, "wb") as out_file:
        content = await file.read()
        await out_file.write(content)

    queue = asyncio.Queue()
    progress_queues[task_id] = queue

    asyncio.create_task(run_parser(user_id, file_location, queue))

    return JSONResponse(
        status_code=201,
        content={"message": "Resume uploaded successfully", "task_id": task_id},
    )


@router.get("/{user_id}")
async def get_resumes_by_user(user_id: int):
    db = SessionLocal()

    try:
        resume = (
            db.query(Resume)
            .filter(Resume.user_id == user_id)
            .order_by(Resume.created_at.desc())
            .first()
        )

        if not resume:
            return JSONResponse(status_code=200, content={})

        return JSONResponse(status_code=200, content=resume.parsed_data)

    finally:
        db.close()
