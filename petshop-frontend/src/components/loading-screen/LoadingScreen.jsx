import React from 'react';
import {CircularProgress, Stack} from "@mui/material";

const LoadingScreen = () => {
    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                position: "absolute",
                height: "100vh",
                width: "100vw",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: "#FFF",
                zIndex: 100000
            }}
        >
            <CircularProgress color={"primary"}/>
        </Stack>
    );
};

export default LoadingScreen;
