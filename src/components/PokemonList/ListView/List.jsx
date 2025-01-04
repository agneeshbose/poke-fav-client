import { useContext } from "react";
import pokeBallImg from "../../../assets/images/Pokeball_2.png";
import favFillIcon from "../../../assets/images/fav-fill.svg";
import pokeList from "../../../assets/pokemon.json";
import pokeFavList from "../../../assets/pokemon_fav.json";
import { DataProviderContext } from "../../../libs/contexts/data-provider.context";

const List = () => {
  const { activeFilter } = useContext(DataProviderContext);

  const activeList = activeFilter === "ALL" ? pokeList : pokeFavList;

  return (
    <div className="list">
      {activeList.results.map(({ name }) => (
        <div className="list-item" key={name}>
          <div className="list-item-title">
            <img src={pokeBallImg} alt="poke ball image" width="30rem" />
            {name}
          </div>
          <img src={favFillIcon} alt="poke ball image" width="30rem" />
        </div>
      ))}
    </div>
  );
};

export default List;
