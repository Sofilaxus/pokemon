import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import PokemonInfoModal from "../modals/PokemonInfoModal";
import Search from "./Search.tsx";
import { useAxios } from "../hooks/UseApiHook.tsx";
import CircularProgress from "@mui/material/CircularProgress";

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
    // states and stuff
    const [offset, setOffset] = useState(0);
    const limit = 7;
    const [count, setCount] = useState(0);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
    const [search, setSearch] = useState<string>("");

    const fetchPokemonDetails = async (url: string) => {
        setIsLoadingModal(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSelectedPokemon(data);
        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        } finally {
            setIsLoadingModal(false);
        }
    };

    const { fetchData: fetchPokemonList } = useAxios<TAllPokemon>({
        url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
        initialData: null,
    });

    const { fetchData: fetchAllPokemon } = useAxios<TAllPokemon>({
        url: `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`,
        initialData: null,
    });

    const getPokemon = async () => {
        setIsLoadingPage(true);
        try {
            const response = await fetchPokemonList();
            if (response?.data) {
                setPokemonList(response.data.results);
                setCount(response.data.count);
            }
        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
        } finally {
            setIsLoadingPage(false);
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

    // useeffects
    useEffect(() => {
        getPokemon();
        getAllPokemon();
    }, [offset]);

    useEffect(() => {
        setOffset(0);
    }, [search]);

    useEffect(() => {
        if (selectedPokemon) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedPokemon]);

    const isSearchMode = search.trim().length > 0;
    const filteredList = isSearchMode
        ? allPokemon.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
          )
        : pokemonList;

    const getPokemonId = (url: string) => {
        const match = url.match(/\/pokemon\/(\d+)\//);
        return match ? match[1] : null;
    };

    const getImageUrl = (url: string) => {
        const id = getPokemonId(url);
        return id
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            : "";
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const paginatedList = isSearchMode
        ? filteredList.slice(offset, offset + limit)
        : filteredList;
    const totalPages = isSearchMode
        ? Math.ceil(filteredList.length / limit)
        : Math.ceil(count / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    return (
        <Box className="background-color" sx={{ width: 900 }}>
            <Box sx={{ padding: 2 }}>
                <Search search={search} setSearch={setSearch} />

                <Typography variant="h6" gutterBottom>
                    There are currently {count} Pokémon!
                </Typography>

                {isLoadingModal && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <CircularProgress size={40} />
                    </Box>
                )}

                {isLoadingPage ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <List>
                        {paginatedList.map((pokemon) => (
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
                                    onClick={() =>
                                        fetchPokemonDetails(pokemon.url)
                                    }
                                >
                                    <img
                                        src={getImageUrl(pokemon.url)}
                                        alt={pokemon.name}
                                        style={{
                                            width: "50px",
                                            marginRight: "1rem",
                                        }}
                                    />
                                    <ListItemText
                                        primary={capitalize(pokemon.name)}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => setOffset(0)}
                        disabled={offset === 0}
                    >
                        {"<< Page 1"}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setOffset(offset - limit)}
                        disabled={offset === 0}
                    >
                        Previous
                    </Button>
                    <Typography variant="body1">
                        Page {currentPage} / {totalPages}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setOffset(offset + limit)}
                        disabled={
                            offset + limit >=
                            (isSearchMode ? filteredList.length : count)
                        }
                    >
                        Next
                    </Button>
                </Box>

                <PokemonInfoModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                />
            </Box>
        </Box>
    );
};

export default PokemonTable;
