export type UserRole = "employee" | "manager";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: "bearer";
    user: User;
}