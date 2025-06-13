import React from "react";
import PokemonRow from "./PokemonRow";

const PokemonTable = ({ pokemon, search, setSelectedPokemon }) => (
    <table width="100%">
        <tbody>
            {pokemon
                .filter(({ name: { english } }) =>
                    english
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                    <PokemonRow
                        pokemon={pokemon}
                        onClick={(pokemon) => setSelectedPokemon(pokemon)}
                    />
                ))}
        </tbody>
    </table>
);

export default PokemonTable;
