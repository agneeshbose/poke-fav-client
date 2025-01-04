import apiClient from "../api-client";
import API_ENDPOINTS from "../endpoints";

const getPokemon = async () => {
  const response = await apiClient.get(API_ENDPOINTS.POKEMON);
  return response.data;
};

export default {
  getPokemon,
};
