import {
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {IconLogin, IconLogout, IconMenu} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {deepPurple, grey} from "@mui/material/colors";
import React from "react";

export const NavigationDrawer = ({open, handleClose, onLogout, currentUser, isAuth, openCreatePet}) => {

    return (
        <Drawer
            anchor={"right"}
            open={open}
            onClose={handleClose}
            sx={{
                height: "100vh",
                width: '100%',
                flex: 1,
                display: {xs: "inherit", md: "none"}
            }}
            PaperProps={{
                sx: {
                    maxWidth: "360px",
                    width: "100% !important",
                },
            }}
        >
            <Stack direction={"column"} gap={1} sx={{
                height: "100vh",
                maxWidth: "360px",
                width: "100% !important",
                bgcolor: "#FFF"
            }}>
                <Box sx={{p: 2, bgcolor: "#FFF"}}>
                    <IconButton onClick={handleClose}>
                        <IconMenu/>
                    </IconButton>
                    <Box sx={{flex: 1, maxHeight: "100%", overflowY: 'auto'}}>
                        {
                            isAuth && currentUser &&
                            <Stack direction={"row"} gap={2} alignItems={"center"} sx={{p: 2}}>
                                <Avatar
                                    sx={{bgcolor: deepPurple[100], color: deepPurple[400]}}
                                >
                                    {currentUser?.name && currentUser?.lastname && `${currentUser?.name[0]}${currentUser?.lastname[0]}`}
                                </Avatar>
                                <Box>
                                    <Typography fontWeight={700}
                                                fontSize={15}>{`${currentUser?.name} ${currentUser?.lastname}`}</Typography>
                                    <Typography fontWeight={500} fontSize={13}
                                                sx={{color: grey[500]}}>Budged: {currentUser?.budged}</Typography>
                                </Box>
                            </Stack>
                        }
                        <List sx={{height: "100%"}}>

                            <ListItemButton onClick={handleClose} component={Link} to={"/"}>
                                <ListItemText>
                                    <Typography variant={"subtitle2"} fontWeight={"bold"}>Home</Typography>
                                </ListItemText>
                            </ListItemButton>

                            {
                                isAuth ?
                                    <>
                                        <ListItemButton onClick={handleClose} component={Link} to={"/my-pets"}>
                                            <ListItemText>
                                                <Typography variant={"subtitle2"} fontWeight={"bold"}>My Pets</Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                        <ListItemButton onClick={() => {
                                            openCreatePet();
                                            handleClose();
                                        }}>
                                            <ListItemText>
                                                <Typography variant={"subtitle2"} fontWeight={"bold"}>Create new Pet</Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={() => {
                                                onLogout();
                                                handleClose();
                                            }}
                                            sx={{color: deepPurple[400], mt: "auto"}}
                                        >
                                            <ListItemIcon color={"secondary"} sx={{color: deepPurple[400]}}>
                                                <IconLogout sx={{color: deepPurple[400]}}/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography color={"secondary"} variant={"subtitle2"}
                                                            fontWeight={"bold"}>Logout</Typography>
                                            </ListItemText>
                                        </ListItemButton>

                                    </> :
                                    <ListItemButton
                                        component={Link}
                                        to={"/login"}
                                        sx={{color: deepPurple[400], mt: "auto"}}
                                    >
                                        <ListItemIcon color={"secondary"} sx={{color: deepPurple[400]}}>
                                            <IconLogin sx={{color: deepPurple[400]}}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography color={"secondary"} variant={"subtitle2"}
                                                        fontWeight={"bold"}>Sign in</Typography>
                                        </ListItemText>
                                    </ListItemButton>


                            }



                        </List>
                    </Box>
                </Box>
            </Stack>
        </Drawer>
    )
}