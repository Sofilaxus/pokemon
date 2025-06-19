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

const PokemonInfoModal = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    return (
        <>
            <div style={overlayStyle} onClick={onClose} />
            <div style={modalStyle}>
                <h2>{pokemon.name}</h2>
                <img
                    src={pokemon.sprites?.front_default}
                    alt={pokemon.name}
                />
                <p>
                    <strong>Types:</strong>{" "}
                    {pokemon.types.map((t) => t.type.name).join(", ")}
                </p>
                <button onClick={onClose}>Close</button>
            </div>
        </>
    );
};

export default PokemonInfoModal;
