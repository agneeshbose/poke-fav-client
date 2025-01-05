import { useState, useEffect, useCallback } from "react";
import {
  getAllPokemon,
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonSpecies,
} from "../api/services/pokemon";

const useAllPokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAllPokemon = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getAllPokemon();
      setData(res?.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  return {
    isLoading,
    data,
    error,
    refetch: fetchAllPokemon,
  };
};

const usePokemon = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getPokemon(id);
        setData(res?.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  return {
    isLoading: isLoading,
    data,
    error,
  };
};

const usePokemonEvolutionChain = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonEvolutionChain = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getPokemonSpecies(id);

        const evolutionChainParts = res?.data?.evolution_chain?.url?.split("/");
        const evolutionChainId =
          evolutionChainParts[evolutionChainParts.length - 2];

        const chainData = await getPokemonEvolutionChain(evolutionChainId);

        const evolutions = [];
        let current = chainData?.data?.chain;

        while (current) {
          evolutions.push(current.species.name);
          current = current.evolves_to[0];
        }

        setData(evolutions);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPokemonEvolutionChain();
    }
  }, [id]);

  return {
    isLoading,
    data,
    error,
  };
};

export { useAllPokemon, usePokemon, usePokemonEvolutionChain };
