from fastapi import FastAPI

app = FastAPI(
    title="Bar Inventory API",
    description="Backend API for the bar inventory application",
    version="0.1.0",
)


@app.get("/")
def root():
    return {"message": "Welcome to the Bar Inventory API"}


@app.get("/health")
def health_check():
    return {"status": "ok"}