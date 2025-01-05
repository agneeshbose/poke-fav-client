import { useContext } from "react";
import pokeBallImg from "../../../assets/images/Pokeball_2.png";
import favFillIcon from "../../../assets/images/fav-fill.svg";
import { DataProviderContext } from "../../../contexts/data-provider.context";
import { useAllPokemon } from "../../../hooks/pokeman";
import Skeleton from "react-loading-skeleton";

const List = () => {
  const {
    favourites,
    activeFilter,
    updateActivePreviewItem,
    activePreviewItem,
  } = useContext(DataProviderContext);

  const pokemon = useAllPokemon();

  const activeList =
    activeFilter === "ALL" ? pokemon.data?.results : favourites.data;

  if (favourites.isLoading || pokemon.isLoading) {
    return (
      <div>
        <Skeleton
          count={6}
          height="2.8rem"
          width="92%"
          baseColor="rgb(37 117 187)"
          borderRadius={12}
          containerClassName="list-loader"
          style={{ marginBottom: 6, marginTop: 12 }}
        />
      </div>
    );
  }

  return (
    <div className="list">
      {activeList?.map(({ name, url }) => {
        const isFavourite = favourites.data?.some((item) => item.name === name);
        const isActive = activePreviewItem?.name === name;

        return (
          <div
            className={`list-item ${isActive ? "active" : ""}`}
            key={name}
            onClick={() => updateActivePreviewItem({ name, url })}
          >
            <div className="list-item-title">
              <img src={pokeBallImg} alt="poke ball image" width="30rem" />
              {name}
            </div>
            {isFavourite && (
              <img src={favFillIcon} alt="poke ball image" width="25rem" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
