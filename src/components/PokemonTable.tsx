import React, { useEffect, useState, useMemo, useRef } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import TypeBadge from "../resources/typecolours.tsx";

type Pokemon = {
    name: string;
    url: string;
};

const PokemonTable = ({
    selectedTypes,
    search,
}: {
    selectedTypes: string[];
    search: string;
}) => {
    const [count, setCount] = useState(0);
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
    const [typeFilteredPokemonNames, setTypeFilteredPokemonNames] = useState<
        string[] | null
    >(null);
    const [offset, setOffset] = useState(0);
    const limit = 7;
    const [pokemonTypes, setPokemonTypes] = useState<Record<string, string[]>>(
        {}
    );

    const pokemonTypesRef = useRef<Record<string, string[]>>({});

    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const paginatedList = useMemo(() => {
        return filteredPokemon.slice(offset, offset + limit);
    }, [filteredPokemon, offset]);

    const totalPages = Math.ceil(filteredPokemon.length / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    useEffect(() => {
        const fetchAllPokemon = async () => {
            setIsLoadingPage(true);
            try {
                const countRes = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=1`
                );
                const countData = await countRes.json();
                setCount(countData.count);

                const allRes = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=${countData.count}`
                );
                const allData = await allRes.json();
                setAllPokemon(allData.results);
            } catch (error) {
                console.error("Error fetching all Pokémon:", error);
            } finally {
                setIsLoadingPage(false);
            }
        };

        fetchAllPokemon();
    }, []);

    useEffect(() => {
        const getPokemonByType = async (type: string): Promise<string[]> => {
            try {
                const res = await fetch(
                    `https://pokeapi.co/api/v2/type/${type}`
                );
                const data = await res.json();
                return data.pokemon.map((p: any) => p.pokemon.name);
            } catch (e) {
                console.error("Failed to fetch Pokémon by type", e);
                return [];
            }
        };

        const filterByTypes = async () => {
            if (selectedTypes.length === 0) {
                setTypeFilteredPokemonNames(null);
                return;
            }

            const allNamesArrays = await Promise.all(
                selectedTypes.map((type) => getPokemonByType(type))
            );

            const intersection = allNamesArrays.reduce((acc, arr) =>
                acc.filter((name) => arr.includes(name))
            );

            setTypeFilteredPokemonNames(intersection);
        };

        filterByTypes();
    }, [selectedTypes]);

    useEffect(() => {
        if (!allPokemon.length) return;

        let filtered = allPokemon;

        if (search.trim()) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (typeFilteredPokemonNames) {
            filtered = filtered.filter((p) =>
                typeFilteredPokemonNames.includes(p.name)
            );
        }

        setFilteredPokemon(filtered);
        setOffset(0);
    }, [search, typeFilteredPokemonNames, allPokemon]);

    useEffect(() => {
        const fetchTypesForPage = async () => {
            const newTypes: Record<string, string[]> = {};

            await Promise.all(
                paginatedList.map(async (pokemon) => {
                    if (!pokemonTypesRef.current[pokemon.name]) {
                        try {
                            const res = await fetch(pokemon.url);
                            const data = await res.json();
                            newTypes[pokemon.name] = data.types.map(
                                (t: any) => t.type.name
                            );
                        } catch (error) {
                            console.error(
                                "Failed to fetch types for",
                                pokemon.name,
                                error
                            );
                            newTypes[pokemon.name] = [];
                        }
                    }
                })
            );

            if (Object.keys(newTypes).length > 0) {
                pokemonTypesRef.current = {
                    ...pokemonTypesRef.current,
                    ...newTypes,
                };
                setPokemonTypes(pokemonTypesRef.current);
            }
        };

        fetchTypesForPage();
    }, [paginatedList]);

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

    return (
        <Box
            className="background-color"
            sx={{ width: 900, borderRadius: "8px" }}
        >
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    There are currently {count} Pokémon! This list contains{" "}
                    {filteredPokemon.length} pokémon.
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
                ) : paginatedList.length === 0 ? (
                    <Typography variant="body1" align="center" mt={4}>
                        No Pokémon found!
                    </Typography>
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
                                    {(pokemonTypes[pokemon.name] || []).map(
                                        (type) => (
                                            <TypeBadge key={type} type={type} />
                                        )
                                    )}
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
                        onClick={() =>
                            setOffset((prev) => Math.max(prev - limit, 0))
                        }
                        disabled={offset === 0}
                    >
                        Previous
                    </Button>
                    <Typography variant="body1">
                        Page {currentPage} / {totalPages || 1}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() =>
                            setOffset((prev) =>
                                Math.min(
                                    prev + limit,
                                    filteredPokemon.length - limit
                                )
                            )
                        }
                        disabled={offset + limit >= filteredPokemon.length}
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
