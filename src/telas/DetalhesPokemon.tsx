import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { ProcurarPorNome} from '../api/api';
import { PokemonDetail } from '../types/Pokemon';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function PokemonDetailScreen({ route, navigation }: Props) {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carregarPokemon = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ProcurarPorNome(name);
      setPokemon(data);
    } catch (err) {
      setError('Erro ao carregar Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarPokemon(); }, [name]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={carregarPokemon} />;

  if (!pokemon) return null;

  const image = pokemon.sprites.other?.['official-artwork']?.front_default;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{pokemon.name}</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.section}>Tipos:</Text>
      {pokemon.types.map((t) => <Text key={t.type.name} style={styles.text}>{t.type.name}</Text>)}

      <Text style={styles.section}>Habilidades:</Text>
      {pokemon.abilities.map((a) => <Text key={a.ability.name} style={styles.text}>{a.ability.name}</Text>)}

      <Text style={styles.section}>Stats:</Text>
      {pokemon.stats.map((s) => <Text key={s.stat.name} style={styles.text}>{`${s.stat.name}: ${s.base_stat}`}</Text>)}

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, alignItems: 'center' },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 10 },
  image: { width: 200, height: 200, marginBottom: 20 },
  section: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  text: { fontSize: 16, textTransform: 'capitalize' },
});
