import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2457A7" />
        <Text style={styles.loadingText}>Checking session...</Text>
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.home}>
        <Text style={styles.title}>Inventory & Waste Management</Text>
        <Text style={styles.welcome}>Welcome, {user.name}</Text>
        <Text style={styles.role}>Role: {user.role}</Text>

        <Text style={styles.message}>
          Your account is signed in. The inventory dashboard will be added
          after authentication and database integration are complete.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => {
            void logout().catch(() => {
              // Keep the error visible if secure storage cannot be cleared.
              // A future shared error handler can improve this.
            });
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    );
  }

  return showRegister ? (
    <RegisterScreen onLoginPress={() => setShowRegister(false)} />
  ) : (
    <LoginScreen onRegisterPress={() => setShowRegister(true)} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F5F7",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#687386",
  },
  home: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#F3F5F7",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#203047",
  },
  welcome: {
    fontSize: 20,
    color: "#203047",
  },
  role: {
    fontSize: 16,
    color: "#687386",
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: "#465366",
  },
  button: {
    backgroundColor: "#2457A7",
    padding: 15,
    borderRadius: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});