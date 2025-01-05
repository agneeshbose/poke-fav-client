import { useState, useEffect, useCallback, useContext } from "react";

import {
  getFavourites,
  addFavourite,
  removeFavourites,
} from "../api/services/favourites";
import { DataProviderContext } from "../contexts/data-provider.context";

const useFavourites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchFavourites = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getFavourites();
      setData(res?.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  return {
    isLoading,
    data,
    error,
    refetch: fetchFavourites,
  };
};

const useAddToFavourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favourites } = useContext(DataProviderContext);

  const addToFavourites = async (item) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await addFavourite(item);
      await favourites.refetch();
      return response;
    } catch (err) {
      setError(err);
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAddLoading: isLoading,
    addToFavourites,
    error,
  };
};

const useRemoveFromFavourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favourites } = useContext(DataProviderContext);

  const removeFromFavourites = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await removeFavourites(id);
      await favourites.refetch();
      return response;
    } catch (err) {
      setError(err);
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isRemoveLoading: isLoading,
    removeFromFavourites,
    error,
  };
};

export { useFavourites, useAddToFavourites, useRemoveFromFavourites };
