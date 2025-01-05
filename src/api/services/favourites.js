import apiClient from "../api-client";
import API_ENDPOINTS from "../endpoints";

const getFavourites = async () => {
  const response = await apiClient.get(API_ENDPOINTS.FAVOURITES);
  return response.data;
};

const addFavourite = async (item) => {
  const response = await apiClient.post(API_ENDPOINTS.FAVOURITES, item);
  return response.data;
};

const removeFavourites = async (name) => {
  const response = await apiClient.delete(
    `${API_ENDPOINTS.FAVOURITES}/${name}`
  );
  return response.data;
};

export { getFavourites, addFavourite, removeFavourites };
