
from sqlalchemy import Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column

from database.connection import Base


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    user_role: Mapped[str] = mapped_column(String(45), nullable=False, server_default=text("'Employee'"))
    account_status: Mapped[str] = mapped_column(String(45), nullable=False, server_default=text("'Pending'"))
