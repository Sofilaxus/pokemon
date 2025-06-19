import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import PokemonInfoModal from "../modals/PokemonInfoModal";
import { useAxios } from "../hooks/UseApiHook.tsx";

type Pokemon = {
    name: string;
    url: string;
};

type TAllPokemon = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};

const PokemonTable = () => {
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [count, setCount] = useState(0);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState<string>("");
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

    const fetchPokemonDetails = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSelectedPokemon(data);
        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        }
    };

    const { fetchData: fetchPokemonList } = useAxios<TAllPokemon>({
        url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
        initialData: null,
    });

    const { fetchData: fetchAllPokemon } = useAxios<TAllPokemon>({
        url: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302`,
        initialData: null,
    });

    const getPokemon = async () => {
        try {
            const response = await fetchPokemonList();
            if (response?.data) {
                setPokemonList(response.data.results);
                setCount(response.data.count);
            }
        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
        }
    };

    const getAllPokemon = async () => {
        try {
            const response = await fetchAllPokemon();
            if (response?.data) {
                setAllPokemon(response.data.results);
            }
        } catch (error) {
            console.error("Error fetching all Pokémon:", error);
        }
    };

    useEffect(() => {
        getPokemon();
        getAllPokemon();
    }, [offset]);

    const filteredPokemon = search.trim()
        ? allPokemon.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
          )
        : pokemonList;

    const canGoPrevious = offset > 0;
    const canGoNext = offset + limit < count;
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <Box sx={{ padding: 2 }}>
            <TextField
                fullWidth
                label="Search Pokémon"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            <Typography variant="h6" gutterBottom>
                There are currently {count} Pokémon!
            </Typography>

            <List>
                {filteredPokemon.map((pokemon) => (
                    <ListItem key={pokemon.name} disablePadding>
                        <ListItemButton
                            sx={{
                                "&.MuiListItemButton-root": {},
                                "&.Mui-focusVisible": {
                                    backgroundColor: "#2e8b57",
                                    color: "white",
                                },
                                "&.Mui": {
                                    backgroundColor: "#2e8b57",
                                    color: "white",
                                },
                                ":hover": {
                                    backgroundColor: "#1871ea",
                                    color: "white",
                                },
                            }}
                            onClick={() => fetchPokemonDetails(pokemon.url)}
                        >
                            <ListItemText primary={capitalize(pokemon.name)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => setOffset(offset - limit)}
                    disabled={!canGoPrevious}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setOffset(offset + limit)}
                    disabled={!canGoNext}
                >
                    Next
                </Button>
            </Box>

            <PokemonInfoModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
            />
        </Box>
    );
};

export default PokemonTable;
