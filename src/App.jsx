import "./App.css";
import pokeLogo from "./assets/images/International_Pokémon_logo.svg.png";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <>
      <header className="header">
        <img src={pokeLogo} width="300rem" alt="main-image" />
      </header>
      <main>
        <PokemonList />
      </main>
    </>
  );
}

export default App;
