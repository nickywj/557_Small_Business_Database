from fastapi import APIRouter
import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from core.config import JWT_ALGORITHM, JWT_SECRET_KEY
from core.security import decode_access_token
from schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserPublic,
)
from services.auth_service import (
    authenticate_user,
    get_user_by_id,
    register_user,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])
bearer_scheme = HTTPBearer(auto_error=False)


@router.post(
    "/register",
    response_model=UserPublic,
    status_code=status.HTTP_201_CREATED,
)
def register(data: RegisterRequest):
    return register_user(data)


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    return authenticate_user(data)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        bearer_scheme
    ),
) -> UserPublic:
    """Validate the bearer token and identify the current user."""
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication token.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None:
        raise unauthorized

    try:
        payload = decode_access_token(credentials.credentials)
    except jwt.InvalidTokenError:
        raise unauthorized

    user_id = payload.get("sub")
    if not isinstance(user_id, str) or not user_id:
        raise unauthorized

    user = get_user_by_id(user_id)
    if user is None:
        raise unauthorized

    return user


@router.get("/me", response_model=UserPublic)
def get_me(current_user: UserPublic = Depends(get_current_user)):
    return current_user