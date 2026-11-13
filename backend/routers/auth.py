import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from database import get_db
from core.security import decode_access_token
from services import auth_service as svc
from schemas.auth import *

router = APIRouter(prefix="/auth", tags=["auth"])
bearer = HTTPBearer()


def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer),
    db: Session = Depends(get_db),
) -> UserPublic:
    try:
        payload = decode_access_token(creds.credentials)
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED,
                            "Invalid or expired token.")
    user = svc.get_user_by_id(db, payload.get("sub", ""))
    if user is None or user.account_status != "Active":
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid session.")
    return svc._to_public(user)


@router.post("/register", response_model=UserPublic, status_code=201)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    return svc.register_user(db, data)


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return svc.authenticate_user(db, data)


@router.get("/me", response_model=UserPublic)
def me(user: UserPublic = Depends(get_current_user)):
    return user
