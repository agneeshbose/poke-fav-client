import { useState, useEffect, useCallback } from "react";
import {
  getAllPokemon,
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonSpecies,
} from "../api/services/pokemon";
import useErrorToast from "./error-toast";

const LIMIT = 20;

const useAllPokemon = () => {
  const { showErrorMessage } = useErrorToast();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchAllPokemon = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getAllPokemon({ offset, limit: LIMIT });
      setData((prevData) => {
        if (prevData?.length > 0) {
          const newData = res?.data?.results;
          return [...prevData, ...newData];
        }
        return res?.data?.results || [];
      });
      setHasMore(!!res?.data?.next);
    } catch (err) {
      setError(err);
      showErrorMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [offset, showErrorMessage]);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setOffset((prev) => prev + LIMIT);
    }
  };

  return {
    isLoading,
    data,
    error,
    hasMore,
    loadMore,
    refetch: fetchAllPokemon,
  };
};

const usePokemon = (id) => {
  const { showErrorMessage } = useErrorToast();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemon = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getPokemon(id);
      setData(res?.data);
    } catch (err) {
      setError(err);
      showErrorMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [id, showErrorMessage]);

  useEffect(() => {
    if (id) {
      fetchPokemon();
    }
  }, [id, fetchPokemon]);

  return {
    isLoading: isLoading,
    data,
    error,
  };
};

const usePokemonEvolutionChain = (id) => {
  const { showErrorMessage } = useErrorToast();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemonEvolutionChain = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getPokemonSpecies(id);

      const evolutionChainUrl = res?.data?.evolution_chain?.url;
      const evolutionChainId = evolutionChainUrl?.split("/").slice(-2, -1)[0];
      const chainData = await getPokemonEvolutionChain(evolutionChainId);

      const evolutions = [];
      let current = chainData?.data?.chain;

      while (current) {
        evolutions.push(current.species.name);
        current = current.evolves_to?.[0];
      }

      setData(evolutions);
    } catch (err) {
      setError(err);
      showErrorMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [id, showErrorMessage]);

  useEffect(() => {
    if (id) {
      fetchPokemonEvolutionChain();
    }
  }, [id, fetchPokemonEvolutionChain]);

  return {
    isLoading,
    data,
    error,
  };
};

export { useAllPokemon, usePokemon, usePokemonEvolutionChain };
