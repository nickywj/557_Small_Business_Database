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
    onLoginPress: () => void;
}

export default function RegisterScreen({ onLoginPress }: Props) {
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleRegister() {
        if (!name.trim() || !email.trim() || !password) {
            Alert.alert("Missing information", "Complete all required fields.");
            return;
        }

        if (password.length < 8) {
            Alert.alert(
                "Password too short",
                "Your password must contain at least 8 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match", "Please enter matching passwords.");
            return;
        }

        setSubmitting(true);

        try {
            await register({
                name: name.trim(),
                email: email.trim(),
                password,
            });

            Alert.alert(
                "Account created",
                "Your account is ready. Please log in.",
                [{ text: "Continue", onPress: onLoginPress }]
            );
        } catch (error) {
            Alert.alert(
                "Registration failed",
                error instanceof Error
                    ? error.message
                    : "Unable to create your account. Please try again."
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
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                    Register for Inventory & Waste Management
                </Text>

                <Text style={styles.label}>Full name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoComplete="name"
                    editable={!submitting}
                />

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
                    placeholder="At least 8 characters"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoComplete="new-password"
                    editable={!submitting}
                />

                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoComplete="new-password"
                    editable={!submitting}
                />

                <Pressable
                    style={[styles.button, submitting && styles.disabled]}
                    onPress={handleRegister}
                    disabled={submitting}
                >
                    {submitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Create Account</Text>
                    )}
                </Pressable>

                <Pressable onPress={onLoginPress} disabled={submitting}>
                    <Text style={styles.link}>Already have an account? Log in</Text>
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
        gap: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#203047",
    },
    subtitle: {
        fontSize: 15,
        color: "#687386",
        marginBottom: 8,
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
        paddingVertical: 12,
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
        marginTop: 10,
        fontSize: 14,
    },
});