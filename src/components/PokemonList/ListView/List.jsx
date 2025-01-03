import pokeBallImg from "../../../assets/images/Pokeball_2.png";
import favFillIcon from "../../../assets/images/fav-fill.svg";
import pokeList from "../../../assets/pokemon.json";

const List = () => {
  return (
    <div className="list">
      {pokeList.results.map(({ name }) => (
        <div className="list-item" key={name}>
          <div className="list-item-title">
            <img src={pokeBallImg} alt="poke ball image" width="30rem" />
            {name?.toUpperCase()}
          </div>
          <img src={favFillIcon} alt="poke ball image" width="30rem" />
        </div>
      ))}
    </div>
  );
};

export default List;
