const API_BASE_URL = "https://tremor-hungrily-democracy.ngrok-free.dev";

export async function apiRequest<T>(
    path: string,
    options: RequestInit = {},
    token?: string
): Promise<T> {
    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                ...options.headers,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
    } catch (error) {
        // Temporary debugging: shows which URL the app is actually calling.
        throw new Error(
            `Cannot reach ${API_BASE_URL}${path}: ${error instanceof Error ? error.message : "network error"
            }`
        );
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
        const detail = body?.detail;
        const message =
            typeof detail === "string"
                ? detail
                : Array.isArray(detail) && detail[0]?.msg
                    ? String(detail[0].msg)
                    : `Request failed with status ${response.status}`;

        throw new Error(message);
    }

    return body as T;
}