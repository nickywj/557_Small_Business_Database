import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";

interface Props {
    onRegisterPress: () => void;
}

export default function LoginScreen({ onRegisterPress }: Props) {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleLogin() {
        if (!email.trim() || !password) {
            Alert.alert("Missing information", "Enter your email and password.");
            return;
        }

        setSubmitting(true);

        try {
            await login({ email: email.trim(), password });
        } catch (error) {
            Alert.alert(
                "Login failed",
                error instanceof Error
                    ? error.message
                    : "Unable to sign in. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Inventory & Waste Management</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    editable={!submitting}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoComplete="current-password"
                    editable={!submitting}
                />

                <Pressable
                    style={[styles.button, submitting && styles.disabled]}
                    onPress={handleLogin}
                    disabled={submitting}
                >
                    {submitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Log In</Text>
                    )}
                </Pressable>

                <Pressable onPress={onRegisterPress} disabled={submitting}>
                    <Text style={styles.link}>
                        Don't have an account? Register
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F5F7",
        justifyContent: "center",
        padding: 24,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        gap: 12,
    },
    title: {
        fontSize: 25,
        fontWeight: "700",
        color: "#203047",
    },
    subtitle: {
        fontSize: 16,
        color: "#687386",
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#203047",
    },
    input: {
        borderWidth: 1,
        borderColor: "#D4DAE2",
        borderRadius: 9,
        paddingHorizontal: 12,
        paddingVertical: 13,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
    },
    button: {
        backgroundColor: "#2457A7",
        borderRadius: 9,
        padding: 15,
        alignItems: "center",
        marginTop: 8,
    },
    disabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
    },
    link: {
        color: "#2457A7",
        textAlign: "center",
        marginTop: 12,
        fontSize: 14,
    },
});