from uuid import uuid4

from fastapi import HTTPException, status

from core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserPublic,
)

# TEMPORARY DEVELOPMENT STORE: For testing login authentication before
# developing a MySQL database. 
# Replace this dictionary with MySQL repository operations later.
_users_by_email: dict[str, dict] = {}


def register_user(data: RegisterRequest) -> UserPublic:
    """Register a new employee account."""
    if data.email in _users_by_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = {
        "id": str(uuid4()),
        "name": data.name,
        "email": data.email,
        "password_hash": hash_password(data.password),
        "role": "employee",
    }

    _users_by_email[data.email] = user

    return UserPublic(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
    )


def authenticate_user(data: LoginRequest) -> TokenResponse:
    """Verify credentials and issue an access token."""
    user = _users_by_email.get(data.email)

    if user is None or not verify_password(
        data.password, user["password_hash"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(subject=user["id"])

    public_user = UserPublic(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
    )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=public_user,
    )

def get_user_by_id(user_id: str) -> UserPublic | None:
    """Find a user by ID without exposing their password hash."""
    for user in _users_by_email.values():
        if user["id"] == user_id:
            return UserPublic(
                id=user["id"],
                name=user["name"],
                email=user["email"],
                role=user["role"],
            )

    return None
