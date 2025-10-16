import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Tentar novamente" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 10, color: 'red', fontSize: 16 },
});
