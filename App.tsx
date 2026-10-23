import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useState } from 'react';

type UserRole = 'Employee' | 'Owner / General Manager';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Inventory</Text>
      <Text style={styles.subtitle}>
        Inventory and waste tracking
      </Text>

      {!selectedRole ? (
        <View style={styles.card}>
          <Text style={styles.heading}>Choose your role</Text>
          <Text style={styles.description}>
            Select the workspace you want to explore.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => setSelectedRole('Employee')}
          >
            <Text style={styles.buttonText}>Employee</Text>
            <Text style={styles.buttonDescription}>
              Log waste and report stock issues
            </Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => setSelectedRole('Owner / General Manager')}
          >
            <Text style={styles.buttonText}>
              Owner / General Manager
            </Text>
            <Text style={styles.buttonDescription}>
              Review waste, stock, and deliveries
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.heading}>{selectedRole}</Text>
          <Text style={styles.description}>
            Welcome to your workspace!
          </Text>

          {selectedRole === 'Employee' ? (
            <>
              <Text style={styles.feature}>• Log wasted inventory</Text>
              <Text style={styles.feature}>• Report low stock</Text>
              <Text style={styles.feature}>• Report out-of-stock items</Text>
            </>
          ) : (
            <>
              <Text style={styles.feature}>• Record deliveries</Text>
              <Text style={styles.feature}>• Review waste reports</Text>
              <Text style={styles.feature}>• Review reorder needs</Text>
            </>
          )}

          <Pressable
            style={styles.secondaryButton}
            onPress={() => setSelectedRole(null)}
          >
            <Text style={styles.secondaryButtonText}>
              Back to role selection
            </Text>
          </Pressable>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    gap: 14,
  },
  heading: {
    fontSize: 21,
    fontWeight: '600',
    color: '#1f2937',
  },
  description: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 10,
    gap: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDescription: {
    color: '#dbeafe',
    fontSize: 13,
  },
  feature: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
  },
  secondaryButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#334155',
    fontWeight: '600',
  },
});