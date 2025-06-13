import React from "react";
import "./App.css";
import PokemonInfo from "./components/PokemonInfo"
import PokemonFilter from "./components/PokemonFilter"
import PokemonTable from "./components/PokemonTable"



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
                    <PokemonFilter
                        search={search}
                        setSearch={setSearch}
                    />
                    <PokemonTable
                        search={search}
                        pokemon={pokemon}
                        setSelectedPokemon={setSelectedPokemon}
                    />
                    
                </div>
                {selectedPokemon && <PokemonInfo {...selectedPokemon} />}
            </div>
        </div>
    );
}

export default App;
