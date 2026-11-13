from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from core.security import create_access_token, hash_password, verify_password
from models.user import User
from schemas.auth import LoginRequest, RegisterRequest, TokenResponse, UserPublic


def _to_public(user: User) -> UserPublic:
    return UserPublic(
        id=str(user.user_id),
        name=f"{user.first_name} {user.last_name}".strip(),
        email=user.email,
        role=user.user_role.lower(),
    )


def register_user(db: Session, data: RegisterRequest) -> UserPublic:
    first, _, last = data.name.partition(" ")
    user = User(
        first_name=first[:50],
        last_name=last.strip()[:50],
        email=data.email,
        password_hash=hash_password(data.password),
        user_role="Employee",
        account_status="Active",
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT,
                            "An account with this email already exists.")
    db.refresh(user)
    return _to_public(user)


def authenticate_user(db: Session, data: LoginRequest) -> TokenResponse:
    user = db.execute(
        select(User).where(User.email == data.email)
    ).scalar_one_or_none()

    if user is None or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED, "Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},)
    if user.account_status != "Active":
        raise HTTPException(status.HTTP_403_FORBIDDEN,
                            "This account is not active.")

    return TokenResponse(
        access_token=create_access_token(subject=str(user.user_id)),
        user=_to_public(user),)


def get_user_by_id(db: Session, user_id: str) -> User | None:
    try:
        return db.get(User, int(user_id))
    except ValueError:
        return None
