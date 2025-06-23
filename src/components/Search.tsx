import { IconButton, InputAdornment, TextField } from "@mui/material";
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
        <TextField
            fullWidth
            label="Search Pokémon"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginBottom: 2 }}
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
    );
};

export default Search;
