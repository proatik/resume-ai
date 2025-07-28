import json

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from sse_starlette.sse import EventSourceResponse

from utils.queue import progress_queues

router = APIRouter()


@router.get("/progress/{task_id}")
async def progress(task_id: str):
    if task_id not in progress_queues:
        return JSONResponse(status_code=404, content={"error": "Invalid task_id"})

    queue = progress_queues[task_id]

    async def event_generator():
        while True:
            update = await queue.get()

            yield f"{json.dumps(update)}"

            if update.get("done"):
                break

    return EventSourceResponse(event_generator())
