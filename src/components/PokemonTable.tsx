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
import CircularProgress from "@mui/material/CircularProgress";

type Pokemon = {
    name: string;
    url: string;
};

const PokemonTable = ({ selectedTypes }: { selectedTypes: string[] }) => {
    const [count, setCount] = useState(0);
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
    const [typeFilteredPokemonNames, setTypeFilteredPokemonNames] = useState<
        string[] | null
    >(null);
    const [search, setSearch] = useState<string>("");
    const [offset, setOffset] = useState(0);
    const limit = 7;

    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    // Pagination calculations
    const paginatedList = filteredPokemon.slice(offset, offset + limit);
    const totalPages = Math.ceil(filteredPokemon.length / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    // Fetch all Pokémon once on mount
    useEffect(() => {
        const fetchAllPokemon = async () => {
            setIsLoadingPage(true);
            try {
                // First fetch total count
                const countRes = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=1`
                );
                const countData = await countRes.json();
                setCount(countData.count);

                // Fetch all Pokémon with the count limit
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

    // Fetch Pokémon names by selected types and update intersection
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

            // Intersection: only Pokémon that are in all selected types
            const intersection = allNamesArrays.reduce((acc, arr) =>
                acc.filter((name) => arr.includes(name))
            );

            setTypeFilteredPokemonNames(intersection);
        };

        filterByTypes();
    }, [selectedTypes]);

    // Apply filtering when search, type filters, or allPokemon changes
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
        setOffset(0); // Reset to first page whenever filters change
    }, [search, typeFilteredPokemonNames, allPokemon]);

    // Fetch Pokémon details for modal
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

    // Get Pokémon ID from URL for image
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

    // Lock scroll when modal open
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
