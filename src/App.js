import React from "react";
import "./App.css";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";



function App() {
    const [search, setSearch] = React.useState("");
    const [pokemon, setPokemon] = React.useState([]);
    const [selectedPokemon, setSelectedPokemon] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3000/pokemon/pokemon.json")
            .then((resp) => resp.json())
            .then((data) => setPokemon(data));
    }, []);

    if (!pokemon) {
      return <div>Loading data</div>;
    }

    return (
      <PokemonContext.Provider
        value={{
          search,
          pokemon,
          selectedPokemon,
          setSearch,
          setPokemon,
          setSelectedPokemon,
        }}
      >
        <div
            style={{
                margin: "auto",
                width: 800,
                paddingTop: "1rem",
            }}
        >
            <h1 className="title">Pokemon Search</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "70% 30%",
                    gridColumnGap: "1rem",
                }}
            >
                <div>
                    <PokemonFilter />
                    <PokemonTable />
                </div>
                <PokemonInfo />
            </div>
        </div>
      </PokemonContext.Provider>
        
    );
}

export default App;
