import React, { useEffect, useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { useAxios } from "../hooks/UseApiHook.tsx";

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

const NavigationBar = () => {
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

    useEffect(() => {
        getAllTypes();
    }, []);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <Box
            sx={{
                width: 200,
                height: 673,
                bgcolor: "#f0f0f0",
                p: 2,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Pokémon Types
            </Typography>

            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                <List>
                    {allTypes.map((type) => (
                        <ListItem key={type.name} disablePadding>
                            <ListItemButton
                                sx={{
                                    "&.Mui-focusVisible": {
                                        backgroundColor: "#2e8b57",
                                        color: "white",
                                    },
                                    ":hover": {
                                        backgroundColor: "#1871ea",
                                        color: "white",
                                    },
                                }}
                                onClick={() => {
                                    console.log(`Clicked type: ${type.name}`);
                                }}
                            >
                                <ListItemText primary={capitalize(type.name)} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default NavigationBar;
