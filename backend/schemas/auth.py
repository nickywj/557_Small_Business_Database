import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


class RegisterRequest(BaseModel):
    first_name: str = Field(min_length=1, max_length=50)
    last_name: str = Field(min_length=1, max_length=50)
    email: str = Field(min_length=5, max_length=150)
    password: str = Field(min_length=8, max_length=128)

    @field_validator("first_name", "last_name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Name cannot be empty.")
        return value

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        value = value.strip().lower()
        pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
        if not re.match(pattern, value):
            raise ValueError("Enter a valid email address.")
        return value


class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=1, max_length=128)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        value = value.strip().lower()
        pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
        if not re.match(pattern, value):
            raise ValueError("Enter a valid email address.")
        return value


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    user_id: str
    first_name: str
    last_name: str
    email: str
    user_role: Literal["Employee", "Manager", "Owner"]
    account_status: Literal["Pending", "Active", "Inactive"]


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic