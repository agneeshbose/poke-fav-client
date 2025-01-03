import ListView from "./ListView";
import Preview from "./Preview";
import "./styles.css";

const PokemonList = () => {
  return (
    <div className="wrapper">
      <ListView />
      <Preview />
    </div>
  );
};

export default PokemonList;
