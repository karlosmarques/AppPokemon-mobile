import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaPokemon from './src/telas/ListaPokemon';
import DetalhePokemon from './src/telas/DetalhesPokemon';

export type RootStackParamList = {
  List: undefined;
  Detail: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListaPokemon} options={{ title: 'Pokémon' }} />
        <Stack.Screen name="Detail" component={DetalhePokemon} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
