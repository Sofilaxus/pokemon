import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SearchProps = {
    search: string;
    setSearch: (value: string) => void;
};

const Search = ({ search, setSearch }: SearchProps) => {
    const handleClearSearch = () => {
        setSearch("");
    };

    return (
        <Box
            className="background-color"
            sx={{ width: 900, borderRadius: "9px", marginBottom: 2 }}
        >
            <TextField
                fullWidth
                label="Search by pokémon name..."
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {search && (
                                <IconButton
                                    aria-label="clear search"
                                    onClick={handleClearSearch}
                                    edge="end"
                                >
                                    <CloseIcon />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default Search;
