import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TypeFilter from "./TypeFilter.tsx";

interface NavigationBarProps {
    selectedTypes: string[];
    setSelectedTypes: (types: string[]) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    selectedTypes,
    setSelectedTypes,
}) => {
    const handleClear = () => {
        setSelectedTypes([]);
    };

    return (
        <Box
            sx={{
                width: 250,
                height: 673,
                bgcolor: "#f0f0f0",
                p: 2,
                display: "flex",
                flexDirection: "column",
                borderRadius: "8px",
                gap: 3,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="types-content"
                    id="types-header"
                >
                    <Typography>Types</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        p: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleClear}
                        disabled={selectedTypes.length === 0}
                    >
                        Clear Selection
                    </Button>

                    <TypeFilter
                        selectedTypes={selectedTypes}
                        setSelectedTypes={setSelectedTypes}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default NavigationBar;
