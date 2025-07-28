from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.chat import router as chat_router
from routes.upload import router as upload_router
from routes.progress import router as progress_router

from database import engine
from models.base import Base
from models.user import User
from models.chat import Chat
from models.resume import Resume


app = FastAPI()


Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(upload_router)
app.include_router(progress_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
