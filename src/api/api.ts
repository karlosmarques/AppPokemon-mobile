export const API_BASE = 'https://pokeapi.co/api/v2';

export async function Listarpokemon(limit = 20, offset = 0) {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Erro ao buscar lista de Pokémon');
  return res.json();
}

export async function ProcurarPorNome(name: string) {
  const res = await fetch(`${API_BASE}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error('Pokémon não encontrado');
  return res.json();
}
