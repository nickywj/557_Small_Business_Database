const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function apiRequest<T>(
    path: string,
    options: RequestInit = {},
    token?: string
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
        const detail = body?.detail;
        const message =
            typeof detail === "string"
                ? detail
                : `Request failed with status ${response.status}`;

        throw new Error(message);
    }

    return body as T;
}