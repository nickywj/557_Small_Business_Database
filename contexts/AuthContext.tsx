import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getCurrentUser,
    login as loginRequest,
    logout as logoutRequest,
    register as registerRequest,
} from "../services/auth";

import type {
    LoginRequest,
    RegisterRequest,
    User,
} from "../types/auth";

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function restoreSession() {
            try {
                const currentUser = await getCurrentUser();

                if (mounted) {
                    setUser(currentUser);
                }
            } catch {
                // No valid session, or the API is currently unreachable.
                // Keep any saved token so a temporary network issue
                // does not automatically delete the user's session.
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        void restoreSession();

        return () => {
            mounted = false;
        };
    }, []);

    async function login(data: LoginRequest): Promise<void> {
        const authenticatedUser = await loginRequest(data);
        setUser(authenticatedUser);
    }

    async function register(data: RegisterRequest): Promise<void> {
        await registerRequest(data);
    }

    async function logout(): Promise<void> {
        await logoutRequest();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }

    return context;
}