import React, {useContext, useEffect, useState} from "react";
import {MainLayout} from "../../layout/MainLayout.jsx";
import {SignInContext} from "../../context/SignInContext.jsx";
import {
    Stack,
    Typography
} from "@mui/material";
import {PetType} from "../../consts/PetType.js";
import axios from "../../axios/axios.jsx";
import {Filter} from "./Filter.jsx";
import {Pets} from "./Pets.jsx";
import {toast} from "react-toastify";

export const Home = () => {
    const {isAuth, currentUser} = useContext(SignInContext);
    const [pets, setPets] = useState([]);
    const [filterParams, setFilterParams] = useState({
        hasOwner: false,
        name: null,
        type: null,
        price: null,
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    });

    useEffect(() => {
        fetchData();
    }, [filterParams?.page, filterParams?.size, filterParams.name, filterParams.hasOwner, filterParams.type, filterParams.price]);

    const fetchData = () => {
        axios.post("/api/pet", filterParams, {
            params: {
                page: filterParams.page,
                size: filterParams.size,
            }
        })
            .then(response => {
                setPets(response.data.content);
                setFilterParams(prev => {
                    const state = {...prev};
                    state.totalPages = response.data.totalPages;
                    state.totalElements = response.data.totalElements;

                    if (state.totalPages <= state.page) {
                        state.page = 0
                    }
                    return state;
                })
            })
            .catch(error => console.log(error));
    }

    const onBuyNow = (pet) => {
        axios.post(`/api/pet/${pet?.id}/buy`)
            .then((response) => {
                toast.success("Congratulations you bought your pet!");
                fetchData();
            })
            .catch(err => {
                console.log(err?.response?.data?.message || "Failed to buy new Pet");
                toast.error(err?.response?.data?.message || "Failed to buy new Pet");
            });
    }

    return (
        <MainLayout>
            <Stack direction={"column"} gap={1.5} sx={{width: "100%", height: "100%", mx: "auto", px: 2, py: 1,}}
                   maxWidth={"lg"}>
                <Typography variant={"h3"} fontWeight={700}>PetShop</Typography>
                <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
                <Pets pets={pets} onBuyNow={onBuyNow} />
            </Stack>
        </MainLayout>
    )
}

