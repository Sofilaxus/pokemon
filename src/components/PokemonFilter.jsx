import React, { useContext } from "react";
import PokemonContext from "../PokemonContext";

const PokemonFilter = () => {
    const { search, setSearch } = useContext(PokemonContext);
    return (
        <input
            type="text"
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
        />
    );
};

export default PokemonFilter;
