import {MainLayout} from "../../layout/MainLayout.jsx";
import React, {useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {Pets} from "../home/Pets.jsx";
import axios from "../../axios/axios.jsx";

export const MyPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get("/api/pet/by-owner")
            .then(response => {
                setPets(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <MainLayout>
            <Stack direction={"column"} gap={1.5} sx={{width: "100%", height: "100%", mx: "auto", px: 2, py: 1,}}
                   maxWidth={"lg"}>
                <Typography variant={"h3"} fontWeight={700}>Your pets</Typography>
                <Pets pets={pets} onBuyNow={() => {}} />
            </Stack>
        </MainLayout>
    )
}