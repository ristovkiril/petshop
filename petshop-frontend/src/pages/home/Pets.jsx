import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import dogImage from "../../assets/dog.jpg";
import catImage from "../../assets/cat.jpg";
import {PetType} from "../../consts/PetType.js";
import {grey} from "@mui/material/colors";
import moment from "moment";

export const Pets = ({pets, onBuyNow}) => {
    return (
        <Stack direction={"row"} gap={3} justifyContent={"space-around"} useFlexGap flexWrap={"wrap"} sx={{width: "100%", pb: 2}}>
            {
                pets?.map(pet => <Pet pet={pet} onBuyNow={onBuyNow}/>)
            }
        </Stack>
    )
}

const Pet = ({pet, onBuyNow}) => {
    const image = pet?.type === PetType?.DOG ? dogImage : catImage;

    return (
        <Stack
            direction={"column"}
            gap={0.5}
            className={"pet-item"}
            justifyContent={"space-between"}
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 5,
                p: 2,
                boxShadow: 3,
                width: "200px"
            }}
        >
            <Box sx={{mx: "auto", textAlign: "center"}}>
                <img src={image} alt={"pet"} className={"pet-img"}/>
            </Box>
            <Typography variant={"h4"} fontWeight={700}>{pet?.name}</Typography>
            <Typography fontWeight={400} noWrap sx={{color: grey[500]}}>{pet?.description}</Typography>
            <Typography fontWeight={700}>{moment(pet?.dateOfBirth).format("DD MMM yyyy")}</Typography>

            <Stack direction={"row"} alignItems={"center"}>
                <Box sx={{flex: 1}}>
                    <Typography fontWeight={500}>Price:</Typography>
                    <Typography fontWeight={700}>{pet?.price?.toFixed(0)}</Typography>
                </Box>
                <Box>
                    {
                        pet?.owner ?
                            <>
                                <Typography fontWeight={500}>Owner:</Typography>
                                <Typography fontWeight={700}>{`${pet?.owner?.firstName} ${pet?.owner?.lastName}`}</Typography>
                            </> :
                            <Button
                                size={"small"}
                                variant={"outlined"}
                                color={"secondary"}
                                onClick={() => onBuyNow(pet)}
                            >
                                Buy Now
                            </Button>

                    }
                </Box>
            </Stack>
        </Stack>
    )
}