import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PokemonCardProps {
  name: string;
  onPress: () => void;
}

export default function PokemonCard({ name, onPress }: PokemonCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
