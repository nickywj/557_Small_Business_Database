from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from core.config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    JWT_ALGORITHM,
    JWT_SECRET_KEY,
)

# Argon2 is the recommended password hashing algorithm for this project.
password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    """Return a secure hash of a user's password."""
    return password_hash.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """Check a submitted password against its stored hash."""
    return password_hash.verify(password, hashed_password)


def create_access_token(subject: str) -> str:
    """Create a signed JWT for an authenticated user."""
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": subject,
        "exp": expires_at,
    }

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM,
    )


def decode_access_token(token: str) -> dict:
    """Validate a JWT and return its payload."""
    return jwt.decode(
        token,
        JWT_SECRET_KEY,
        algorithms=[JWT_ALGORITHM],
    )