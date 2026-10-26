import * as SecureStore from "expo-secure-store";

import { apiRequest } from "./api";
import type {
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    User,
} from "../types/auth";

const TOKEN_KEY = "access_token";

export async function register(
    data: RegisterRequest
): Promise<User> {
    return apiRequest<User>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function login(
    data: LoginRequest
): Promise<User> {
    const result = await apiRequest<TokenResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });

    await SecureStore.setItemAsync(TOKEN_KEY, result.access_token);

    return result.user;
}

export async function getCurrentUser(): Promise<User> {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (!token) {
        throw new Error("No saved login session.");
    }

    return apiRequest<User>("/auth/me", {}, token);
}

export async function logout(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
}