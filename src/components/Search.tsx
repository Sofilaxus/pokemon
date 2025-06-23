import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

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
            className="background-color-search"
            sx={{ width: 900, marginBottom: 2 }}
        >
            <TextField
                fullWidth
                placeholder="Search by pokémon name..."
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
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
