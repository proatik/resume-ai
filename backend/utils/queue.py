import asyncio
from typing import Dict

progress_queues: Dict[str, asyncio.Queue] = {}
