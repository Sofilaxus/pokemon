import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button } from "@mui/material";

const PokemonRow = ({ pokemon, onSelect }) => (
    <tr>
        <td>{pokemon.name.english}</td>
        <td>{pokemon.type.join(", ")}</td>
        <td>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onSelect(pokemon)}
            >
                Select!
            </Button>
        </td>
    </tr>
);

PokemonRow.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.shape({
            english: PropTypes.string.isRequired,
        }),
        type: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
    onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
    <div>
        <h1>{name.english}</h1>
        <table>
            <tbody>
                {Object.keys(base).map((key) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{base[key]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

PokemonInfo.propTypes = {
    name: PropTypes.shape({
        english: PropTypes.string.isRequired,
    }),
    base: PropTypes.shape({
        HP: PropTypes.number.isRequired,
        Attack: PropTypes.number.isRequired,
        Defense: PropTypes.number.isRequired,
        "Sp. Attack": PropTypes.number.isRequired,
        "Sp. Defense": PropTypes.number.isRequired,
        Speed: PropTypes.number.isRequired,
    }),
};

function App() {
    const [search, setSearch] = React.useState("");
    const [pokemon, setPokemon] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3000/pokemon/pokemon.json")
            .then((resp) => resp.json())
            .then((data) => setPokemon(data));
    }, []);

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
                    <input
                        value={search}
                        onChange={(evt) => setSearch(evt.target.value)}
                    />
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon
                                .filter((pokemon) =>
                                    pokemon.name.english
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .slice(0, 20)
                                .map((pokemon) => (
                                    <PokemonRow
                                        pokemon={pokemon}
                                        key={pokemon.id}
                                        onSelect={(pokemon) =>
                                            setSelectedItem(pokemon)
                                        }
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
                {selectedItem && <PokemonInfo {...selectedItem} />}
            </div>
        </div>
    );
}

export default App;
