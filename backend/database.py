import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

# Load backend/.env
BACKEND_DIR = Path(__file__).resolve().parent
load_dotenv(BACKEND_DIR / ".env")
# Read database configuration
database_url = URL.create(
    drivername="mysql+pymysql",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", "3306")),
    database=os.getenv("DB_NAME"),
)
# Create database engine
engine = create_engine(database_url, pool_pre_ping=True,)
# Create database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine,)
# Base class for database models
Base = declarative_base()
# Provide a database session to API endpoints


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
