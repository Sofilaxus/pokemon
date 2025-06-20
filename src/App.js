import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import PokemonTable from "./components/PokemonTable.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import logo from "./resources/images/logo.png";

function App() {
    return (
        <div
            style={{
                margin: "auto",
                width: "auto",
                height: "auto",
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
                    justifyContent: "space-between",
                    marginTop: 2,
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <NavigationBar />
                <PokemonTable />
            </Box>
        </div>
    );
}

export default App;
