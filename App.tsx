import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Inventory</Text>

      <Text style={styles.subtitle}>
        Inventory and waste tracking
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Backend connection</Text>
        <Text style={styles.statusText}>
          Not tested yet
        </Text>
        <Button
          title="Connection test coming soon"
          disabled
          onPress={() => { }}
        />
      </View>

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
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32,
  },
  statusCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 15,
    color: '#64748b',
  },
});
