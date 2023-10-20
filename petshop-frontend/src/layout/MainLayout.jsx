import React, {useContext, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {SignInContext} from "../context/SignInContext.jsx";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem, ListItemButton, ListItemIcon,
    ListItemText,
    Menu,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import logo from "/pet-logo.jpg"
import {deepPurple, grey} from "@mui/material/colors";
import {IconLogout, IconMenu, IconPlus} from "@tabler/icons-react";
import {CreatePetModal} from "./CreatePetModal.jsx";
import {NavigationDrawer} from "./NavigationDrawer.jsx";

export const MainLayout = ({children}) => {
    const {isAuth, currentUser, onLogout} = useContext(SignInContext);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Stack direction={"column"} sx={{width: "100vw", height: "100dvh"}}>
            <CreatePetModal
                open={openCreateModal}
                handleClose={() => setOpenCreateModal(false)}
            />
            <NavigationDrawer
                open={openDrawer}
                handleClose={() => setOpenDrawer(false)}
                onLogout={onLogout}
                currentUser={currentUser}
                isAuth={isAuth}
                openCreatePet={() => setOpenCreateModal(true)}
            />
            <Toolbar>
                <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"space-between"}
                       sx={{width: "100%"}}>
                    <Button component={Link} to={"/"}>
                        <img src={logo} alt={'pet logo'} width={40} height={'auto'}/>
                    </Button>
                    <Stack direction={"row"} gap={2} alignItems={"center"} sx={{display: {xs: "none", sm: "flex"} }}>
                        <Button component={NavLink} to={"/"}
                                sx={{borderBottom: 2, borderRadius: 0, borderColor: "transparent"}}
                                className={"nav-link"}>
                            Home
                        </Button>
                        {
                            isAuth ?
                                <>
                                    <Button component={NavLink} to={"/my-pets"}
                                            sx={{borderBottom: 2, borderRadius: 0, borderColor: "transparent"}}
                                            className={"nav-link"}>
                                        My Pets
                                    </Button>

                                    <Button
                                        variant={"contained"}
                                        color={"secondary"}
                                        sx={{
                                            borderRadius: 5,
                                            color: "#FFF !important"
                                        }}
                                        onClick={() => setOpenCreateModal(true)}
                                    >
                                        <IconPlus size={15} style={{marginRight: 5}}/>
                                        Create Pet
                                    </Button>
                                    <UserMenu currentUser={currentUser} onLogout={onLogout}></UserMenu>
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
                    <Button
                        onClick={() => setOpenDrawer(true)}
                        sx={{
                            color: "#1e1e1e",
                            display: {xs: "flex", sm: "none"}
                        }}
                    >
                        <IconMenu />
                    </Button>
                </Stack>
            </Toolbar>
            <Box sx={{flex: 1, overflowY: "auto", mx: "auto", width: "100%"}}>
                {children}
            </Box>
        </Stack>
    )
}

const UserMenu = ({currentUser, onLogout}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                size={"small"}
                sx={{p: 0}}
                variant={"secondary"}
                onClick={handleClick}
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
            >
                <Avatar
                    sx={{bgcolor: deepPurple[100], color: deepPurple[400]}}
                >
                    {currentUser?.name && currentUser?.lastname && `${currentUser?.name[0]}${currentUser?.lastname[0]}`}
                </Avatar>
            </IconButton>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                sx={{minWidth: "170px"}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <List sx={{p: 0, minWidth: "170px", width: "100%"}}>
                    <ListItem sx={{pb: 2}}>
                        <Stack direction={"row"} gap={2} alignItems={"center"}>
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
                    </ListItem>
                    <ListItemButton
                        color={"secondary"}
                        onClick={onLogout}
                    >
                        <ListItemIcon>
                            <IconLogout color={deepPurple[500]} />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{sx: {fontWeight: 700, fontSize: 17} }}
                            primary={`Logout`}
                            sx={{color: deepPurple[500]}}
                        ></ListItemText>
                    </ListItemButton>
                </List>
            </Menu>
        </>
    )
}