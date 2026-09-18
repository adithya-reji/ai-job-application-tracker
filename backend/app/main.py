from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine

from app.models.user import User
from app.models.profile import Profile

from app.api.auth import router as auth_router
from app.api.profile import router as profile_router
from app.api.jobs import router as jobs_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Job Application Tracker")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173", # Add this
    "http://localhost:3000",
    "http://127.0.0.1:3000", # Add this
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(jobs_router)