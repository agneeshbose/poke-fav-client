import apiClient from "../api-client";
import API_ENDPOINTS from "../endpoints";

const getAllPokemon = async ({ limit = 6, offset = 0 }) => {
  const query = new URLSearchParams({ limit, offset });
  const response = await apiClient.get(
    `${API_ENDPOINTS.POKE}/pokemon?${query.toString()}`
  );
  return response.data;
};

const getPokemon = async (id) => {
  const response = await apiClient.get(`${API_ENDPOINTS.POKE}/pokemon/${id}`);
  return response.data;
};

const getPokemonSpecies = async (id) => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.POKE}/pokemon-species/${id}`
  );
  return response.data;
};

const getPokemonEvolutionChain = async (id) => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.POKE}/evolution-chain/${id}`
  );
  return response.data;
};

export {
  getAllPokemon,
  getPokemon,
  getPokemonSpecies,
  getPokemonEvolutionChain,
};
