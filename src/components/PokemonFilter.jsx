import React from "react";

const PokemonFilter = ({ search, setSearch }) => (
    <input 
    type = "text"
    value={search} 
    onChange={(evt) => setSearch(evt.target.value)}
     />
);

export default PokemonFilter;