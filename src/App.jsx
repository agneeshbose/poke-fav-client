import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import pokeLogo from "./assets/images/International_Pokémon_logo.svg.png";

import PokemonList from "./components/pokemon-list";

function App() {
  return (
    <>
      <header className="header">
        <img src={pokeLogo} width="300rem" alt="main-image" />
      </header>
      <main>
        <PokemonList />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
