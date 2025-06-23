import React, { useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import PokemonTable from "./components/PokemonTable.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import logo from "./resources/images/logo.png";
import Search from "./components/Search.tsx";

function App() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [search, setSearch] = useState("");

    return (
        <div
            style={{
                margin: "fixed",
                width: "fixed",
                height: "fixed",
                padding: "1rem",
                paddingTop: "1rem",
                paddingBottom: "3rem",
            }}
            className="background"
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                }}
            >
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        width: "250px",
                    }}
                />
            </div>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 4,
                }}
            >

                <NavigationBar
                    selectedTypes={selectedTypes}
                    setSelectedTypes={setSelectedTypes}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Search search={search} setSearch={setSearch} />
                    <PokemonTable selectedTypes={selectedTypes} search={search} />
                </Box>
            </Box>
        </div>
    );
}

export default App;
