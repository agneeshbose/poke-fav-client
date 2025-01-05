import ListView from "./list-view";
import Preview from "./preview";

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
