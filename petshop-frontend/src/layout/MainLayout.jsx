import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import {SignInContext} from "../context/SignInContext.jsx";
import {Avatar, Box, Button, IconButton, Stack, Toolbar} from "@mui/material";
import logo from "/pet-logo.jpg"
import {deepPurple} from "@mui/material/colors";
import {IconPlus} from "@tabler/icons-react";

export const MainLayout = ({children}) => {
    const {isAuth, currentUser} = useContext(SignInContext);

    return (
        <Stack direction={"column"} sx={{width: "100vw", height: "100dvh"}}>
            <Toolbar>
                <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"space-between"}
                       sx={{width: "100%"}}>
                    <Button component={Link} to={"/"}>
                        <img src={logo} alt={'pet logo'} width={40} height={'auto'}/>
                    </Button>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Button component={NavLink} to={"/"} sx={{borderBottom: 2, borderRadius: 0, borderColor: "transparent"}} className={"nav-link"}>
                            Home
                        </Button>
                        {
                            isAuth ?
                                <>
                                    <Button component={NavLink} to={"/my-pets"} sx={{borderBottom: 2, borderRadius: 0, borderColor: "transparent"}} className={"nav-link"}>
                                        My Pets
                                    </Button>

                                    <Button
                                        variant={"contained"}
                                        color={"secondary"}
                                        sx={{
                                            borderRadius: 5,
                                            color: "#FFF !important"
                                        }}
                                    >
                                        <IconPlus size={15} style={{marginRight: 5}} />
                                        Create Pet
                                    </Button>
                                    <IconButton size={"small"} sx={{p: 0}} variant={"secondary"}>
                                        <Avatar
                                            sx={{bgcolor: deepPurple[100], color: deepPurple[400]}}
                                        >
                                            {currentUser?.name && currentUser?.lastname &&`${currentUser?.name[0]}${currentUser?.lastname[0]}`}
                                        </Avatar>
                                    </IconButton>
                                </> :
                                <>
                                    <Button
                                        component={NavLink}
                                        to={"/login"}
                                        variant={"contained"}
                                        color={"secondary"}
                                        sx={{
                                            borderRadius: 5,
                                            color: "#FFF !important"
                                        }}
                                    >
                                        {/*<IconLogin style={{marginRight: 5}} />*/}
                                        Sign in
                                    </Button>
                                </>
                        }
                    </Stack>
                </Stack>
            </Toolbar>
            <Box sx={{flex: 1, overflowY: "auto", mx: "auto", width: "100%"}}>
                {children}
            </Box>
        </Stack>
    )
}