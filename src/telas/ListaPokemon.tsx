import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app';
import PokemonCard from '../components/PokemonCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Listarpokemon, ProcurarPorNome } from '../api/api';
import { PokemonListResult, PokemonListResponse } from '../types/Pokemon';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'List'>;
};

export default function ListaPokemon({ navigation }: Props) {
  const [pokemonList, setPokemonList] = useState<PokemonListResult[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadData = async (off = 0) => {
    setLoading(true);
    setError('');
    try {
      const data: PokemonListResponse = await Listarpokemon(20, off);
      setPokemonList(data.results);
      setOffset(off);
    } catch (err) {
      setError('Erro ao carregar Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSearch = async () => {
    if (!search.trim()) {
      loadData();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const pokemon = await ProcurarPorNome(search);
      navigation.navigate('Detail', { name: pokemon.name });
    } catch (err) {
      setError('Pokémon não encontrado');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => loadData(offset)} />;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar Pokémon"
          value={search}
          onChangeText={setSearch}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} onPress={() => navigation.navigate('Detail', { name: item.name })} />
        )}
      />

      <View style={styles.pagination}>
        <Button title="Anterior" onPress={() => loadData(Math.max(offset - 20, 0))} disabled={offset === 0} />
        <Button title="Próxima" onPress={() => loadData(offset + 20)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: { flexDirection: 'row', padding: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 10, paddingHorizontal: 8, borderRadius: 5 },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
});
