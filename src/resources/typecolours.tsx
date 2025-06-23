import { Box } from "@mui/material";

const TypeBadge = ({ type }: { type: string }) => (
    <Box
        sx={{
            backgroundColor: typeColors[type] || "#ccc",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.8rem",
            padding: "4px 8px",
            borderRadius: "999px",
            display: "inline-block",
            marginRight: "0.5rem",
            textTransform: "capitalize",
        }}
    >
        {type}
    </Box>
);

const typeColors: Record<string, string> = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
};

export default TypeBadge;