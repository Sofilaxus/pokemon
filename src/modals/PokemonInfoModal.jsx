import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import TypeBadge from "../resources/typecolours.tsx";
import PlaySound from "../resources/PlaySound.jsx"; // Adjust the path as necessary

const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
    maxWidth: "400px",
    width: "90%",
    height: "780px",
    overflowY: "auto",
};

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const PokemonInfoModal = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    return (
        <>
            <div style={overlayStyle} onClick={onClose} />
            <div style={modalStyle}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>

                <h2>{capitalize(pokemon.name)}</h2>

                {(pokemon.sprites?.other?.showdown?.front_default ||
                    pokemon.sprites?.front_default) && (
                    <img
                        src={
                            pokemon.sprites?.other?.showdown?.front_default ||
                            pokemon.sprites?.front_default
                        }
                        alt={pokemon.name}
                        style={{ width: "150px", marginBottom: "1rem" }}
                    />
                )}

                <div>
                    Play sound: <PlaySound pokemonSound={pokemon.cries?.latest} />
                </div>

                <p>
                    <strong>Types:</strong>{" "}
                    {pokemon.types.map((t) => (
                        <TypeBadge key={t.type.name} type={t.type.name} />
                    ))}
                </p>

                <p>
                    <strong>Abilities:</strong>{" "}
                    {pokemon.abilities
                        .map((a) => capitalize(a.ability.name))
                        .join(", ")}
                </p>
                <p>
                    <strong>Height:</strong> {(pokemon.height / 10).toFixed(1)} m
                </p>
                <p>
                    <strong>Weight:</strong> {(pokemon.weight / 10).toFixed(1)} kg
                </p>

                <p>
                    <strong>Stats:</strong>
                </p>
                <ul>
                    <li>
                        🧡 HP: {pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat}
                    </li>
                    <li>
                        ⚔️ Attack:{" "}
                        {pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat}
                    </li>
                    <li>
                        🛡️ Defense:{" "}
                        {pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat}
                    </li>
                    <li>
                        🔥 Special Attack:{" "}
                        {pokemon.stats.find((s) => s.stat.name === "special-attack")?.base_stat}
                    </li>
                    <li>
                        🧊 Special Defence:{" "}
                        {pokemon.stats.find((s) => s.stat.name === "special-defense")?.base_stat}
                    </li>
                    <li>
                        💨 Speed: {pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default PokemonInfoModal;
