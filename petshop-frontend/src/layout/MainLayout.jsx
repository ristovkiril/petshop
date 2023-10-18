import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import {SignInContext} from "../context/SignInContext.jsx";
import {Box, Button, Stack, Toolbar} from "@mui/material";
import logo from "/pet-logo.jpg"
import {IconLogin, IconLogout} from "@tabler/icons-react";

export const MainLayout = ({children}) => {
    const {isAuth} = useContext(SignInContext);

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
                                    <Button component={NavLink} to={"/"} sx={{borderBottom: 2, borderRadius: 0, borderColor: "transparent"}} className={"nav-link"}>
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
                                        {/*<IconLogout style={{marginRight: 5}} />*/}
                                        Sign out
                                    </Button>
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
            <Box sx={{flex: 1, overflowY: "auto", px: 2}}>
                {children}
            </Box>
        </Stack>
    )
}