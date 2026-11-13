from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from routers.auth import router as auth_router

app = FastAPI(
    title="Restaurant Inventory API",
    description="Backend API for restaurant and bar inventory and waste tracking.",
    version="0.1.0",
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Restaurant Inventory API is running!",
        "status": "ok",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/health/db")
def health_db(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"database": "connected"}
