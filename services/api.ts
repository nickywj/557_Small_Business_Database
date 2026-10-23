/**
 * API configuration for the mobile app.
 *
 * Set this to your Mac's reachable backend address
 * when you're ready to test on a trusted network.
 */
const API_BASE_URL = 'http://127.0.0.1:8000'; // Change this to phone IP address

export async function checkBackendHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
    }

    return response.json() as Promise<{ status: string }>;
}