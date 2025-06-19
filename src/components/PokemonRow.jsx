import React from "react";
import { Button } from "@mui/material";


const PokemonRow = ({ pokemon, onClick }) => {
    return (
        <tr onClick={onClick} style={{ cursor: "pointer" }}>
            <td>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    {pokemon.name.english}
                </a>
            </td>
            <td>{pokemon.type.join(", ")}</td>
        </tr>
    );
};

export default PokemonRow;