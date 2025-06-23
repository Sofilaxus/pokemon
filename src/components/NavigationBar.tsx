import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useAxios } from "../hooks/UseApiHook.tsx";
import TypeBadge from "../resources/typecolours.tsx";

type Type = {
    name: string;
    url: string;
};

type TAllTypes = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Type[];
};

const NavigationBar = ({
    selectedTypes,
    setSelectedTypes,
}: {
    selectedTypes: string[];
    setSelectedTypes: (types: string[]) => void;
}) => {
    const [allTypes, setAllTypes] = useState<Type[]>([]);

    const { fetchData: fetchAllTypes } = useAxios<TAllTypes>({
        url: `https://pokeapi.co/api/v2/type/`,
        initialData: null,
    });

    const getAllTypes = async () => {
        try {
            const response = await fetchAllTypes();
            if (response?.data) {
                setAllTypes(response.data.results);
            }
        } catch (error) {
            console.error("Error fetching all Types:", error);
        }
    };

    const handleClick = (typeName: string) => {
        if (selectedTypes.includes(typeName)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== typeName));
        } else {
            setSelectedTypes([...selectedTypes, typeName]);
        }
    };

    useEffect(() => {
        getAllTypes();
    }, []);

    return (
        <Box
            sx={{
                width: 200,
                height: 673,
                bgcolor: "#f0f0f0",
                p: 2,
                display: "flex",
                flexDirection: "column",
                borderRadius: "8px",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Pokémon Types
            </Typography>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
                <List>
                    {allTypes.map((type) => (
                        <ListItem key={type.name} disablePadding>
                            <ListItemButton
                                sx={{
                                    backgroundColor: selectedTypes.includes(
                                        type.name
                                    )
                                        ? "#bfbfbf"
                                        : "transparent",
                                    color: selectedTypes.includes(type.name)
                                        ? "white"
                                        : "black",
                                    ":hover": {
                                        backgroundColor: "#1871ea",
                                        color: "white",
                                    },
                                }}
                                onClick={() => handleClick(type.name)}
                            >
                                <TypeBadge type={type.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default NavigationBar;
