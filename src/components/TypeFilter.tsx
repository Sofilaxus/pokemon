import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
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

interface TypeFilterProps {
    selectedTypes: string[];
    setSelectedTypes: (types: string[]) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({
    selectedTypes,
    setSelectedTypes,
}) => {
    const [allTypes, setAllTypes] = useState<Type[]>([]);

    const handleClick = (typeName: string) => {
        if (selectedTypes.includes(typeName)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== typeName));
        } else {
            setSelectedTypes([...selectedTypes, typeName]);
        }
    };

    const { fetchData: fetchAllTypes } = useAxios<TAllTypes>({
        url: `https://pokeapi.co/api/v2/type/`,
        initialData: null,
    });

    useEffect(() => {
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
        getAllTypes();
    }, [fetchAllTypes]);

    return (
        <List
            sx={{
                maxHeight: 500,
                overflowY: "auto",
                bgcolor: "white",
                borderRadius: "8px",
            }}
        >
            {allTypes.map((type) => (
                <ListItem key={type.name} disablePadding>
                    <ListItemButton
                        sx={{
                            backgroundColor: selectedTypes.includes(type.name)
                                ? "#1871ea"
                                : "transparent",
                            color: selectedTypes.includes(type.name)
                                ? "white"
                                : "black",
                            ":hover": {
                                backgroundColor: "#1256b3",
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
    );
};

export default TypeFilter;
