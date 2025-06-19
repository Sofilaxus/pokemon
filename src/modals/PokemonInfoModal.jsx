import React from "react";

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
                <h2>{capitalize(pokemon.name)}</h2>

                {pokemon.sprites?.front_default && (
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        style={{ width: "150px", marginBottom: "1rem" }}
                    />
                )}
                <p>
                    <strong>Types:</strong>{" "}
                    {pokemon.types
                        .map((t) => capitalize(t.type.name))
                        .join(", ")}
                </p>
                <p>
                    <strong>Abilities:</strong>{" "}
                    {pokemon.abilities
                        .map((a) => capitalize(a.ability.name))
                        .join(", ")}
                </p>
                <p>
                    <strong>Height:</strong> {(pokemon.height / 10).toFixed(1)}{" "}
                    m
                </p>
                <p>
                    <strong>Weight:</strong> {(pokemon.weight / 10).toFixed(1)}{" "}
                    kg
                </p>

                <p>
                    <strong>Stats:</strong>
                </p>
                <ul>
                    {pokemon.stats.map((s) => (
                        <li key={s.stat.name}>
                            {capitalize(s.stat.name)}: {s.base_stat}
                        </li>
                    ))}
                </ul>

                <button onClick={onClose}>Close</button>
            </div>
        </>
    );
};

export default PokemonInfoModal;
