from fastapi import FastAPI
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
