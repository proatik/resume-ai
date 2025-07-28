import hashlib
from fastapi import Response
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from database import get_db
from models.user import User

from utils.counter import prompt_counter

router = APIRouter(prefix="/auth")


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


@router.post("/register")
async def register(user_data: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user_data.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400, detail="Email already registered")

    hashed_password = hash_password(user_data.password)

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Registration successful",
        "user": UserResponse(id=new_user.id, name=new_user.name, email=new_user.email)
    }


@router.post("/login")
async def login(user_data: UserLogin, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == user_data.email).first()

    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    hashed_password = hash_password(user_data.password)

    if user.password != hashed_password:
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    return {
        "message": "Login successful",
        "user": UserResponse(id=user.id, name=user.name, email=user.email)
    }


@router.post("/logout/{user_id}")
async def logout(user_id: int):
    if user_id:
        prompt_counter[user_id] = 0

    return Response(status_code=200)
