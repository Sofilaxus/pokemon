import React, { useContext } from "react";
import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

const PokemonTable = () => {
    const { pokemon, search, setSelectedPokemon } = useContext(PokemonContext);
    return (
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
};

export default PokemonTable;
