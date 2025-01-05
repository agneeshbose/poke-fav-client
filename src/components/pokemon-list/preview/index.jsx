import { useContext } from "react";

import "./style.css";
import favEmptyIcon from "../../../assets/images/fav-empty.svg";
import favFillIcon from "../../../assets/images/fav-fill.svg";

import AttributeCard from "./attribute-card";
import { DataProviderContext } from "../../../contexts/data-provider.context";
import { usePokemon, usePokemonEvolutionChain } from "../../../hooks/pokeman";
import {
  useAddToFavourites,
  useRemoveFromFavourites,
} from "../../../hooks/favourites";
import Skeleton from "react-loading-skeleton";

const CircleLoader = () => (
  <Skeleton circle={true} height={15} width={15} baseColor="rgb(255, 204, 1)" />
);

const Preview = () => {
  const { favourites, activePreviewItem, activePreviewItemId } =
    useContext(DataProviderContext);
  const pokemon = usePokemon(activePreviewItemId);
  const evolutionChain = usePokemonEvolutionChain(activePreviewItemId);
  const { addToFavourites, isAddLoading } = useAddToFavourites(favourites);
  const { removeFromFavourites, isRemoveLoading } = useRemoveFromFavourites(
    activePreviewItem?.name
  );

  const isFavourite = favourites?.data?.some(
    (item) => item?.name === activePreviewItem?.name
  );

  if (pokemon.isLoading || evolutionChain.isLoading) {
    return (
      <div className="preview-container">
        <Skeleton
          count={1}
          height="100%"
          baseColor="rgba(39, 116, 186, 0.75)"
        />
      </div>
    );
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <div className="item-name">{pokemon?.data?.name}</div>

        {activePreviewItemId ? (
          <>
            <img
              src={pokemon?.data?.sprites?.other?.home?.front_default}
              width="180px"
              className="preview-image"
              alt="preview"
            />
            {isFavourite ? (
              <div
                className="remove-favourite"
                onClick={() => removeFromFavourites(activePreviewItem?.name)}
              >
                {isRemoveLoading ? (
                  <CircleLoader />
                ) : (
                  <img src={favFillIcon} width="20px" alt="remove" />
                )}

                {isRemoveLoading
                  ? "Removing from favourites"
                  : "Remove from favourites"}
              </div>
            ) : (
              <div
                className="add-favourite"
                onClick={() => addToFavourites(activePreviewItem)}
              >
                {isAddLoading ? (
                  <CircleLoader />
                ) : (
                  <img
                    src={favEmptyIcon}
                    width="20px"
                    color="white"
                    alt="add"
                  />
                )}
                {isAddLoading ? "Adding to favourites" : "Add to favourites"}
              </div>
            )}
          </>
        ) : (
          <div className="preview-instruction">
            Select an item to view the attributes
          </div>
        )}
      </div>

      <AttributeCard
        name="Abilities"
        values={pokemon?.data?.abilities?.map((item) => item?.ability?.name)}
      />
      <AttributeCard
        name="Types"
        values={pokemon?.data?.types?.map((item) => item?.type?.name)}
      />

      <AttributeCard
        name="Evolution options"
        values={evolutionChain.data}
        loading={evolutionChain.isLoading}
      />
    </div>
  );
};

export default Preview;
