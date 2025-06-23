import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import useSound from "use-sound";

const PlaySound = ({ pokemonSound }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const [play, { stop }] = useSound(pokemonSound, {
        volume: 0.15,
        onend: () => setIsPlaying(false),
    });

    const togglePlay = () => {
        if (isPlaying) {
            stop();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    return (
        <IconButton onClick={togglePlay} aria-label="sound">
            {isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
        </IconButton>
    );
};

export default PlaySound;
