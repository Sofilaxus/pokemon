import React from "react";
import "./App.css";
import PokemonTable from "./components/PokemonTable.tsx";

function App() {
    return (
        <div
            style={{
                margin: "auto",
                width: 800,
                paddingTop: "1rem",
            }}
        >
            <h1 className="title">Pokémon</h1>
            <PokemonTable />
        </div>
    );
}

export default App;
