import {Suspense, useContext, useState} from 'react'
import {SignInContext} from "./context/SignInContext.jsx";
import {ThemeProvider} from "@mui/material";
import {ToastContainer} from "react-toastify";
import {Navigate, Route, Routes} from "react-router-dom";
import LoadingScreen from "./components/loading-screen/LoadingScreen.jsx";
import {Login} from "./pages/login/Login.jsx";
import {Register} from "./pages/register/Register.jsx";
import {Home} from "./pages/home/Home.jsx";
import {theme} from "./config/Theme";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const {isAuth} = useContext(SignInContext);

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer/>
            <Suspense fallback={<LoadingScreen/>}>
                <Routes>
                    {
                        isAuth === null ? <LoadingScreen/>
                            :
                            <>
                                <Route path="/" exact index element={<Home/>}/>
                                {
                                    !isAuth ?
                                        <>
                                            <Route path="/login" index element={<Login/>}/>
                                            <Route path="/register" index element={<Register/>}/>
                                            <Route path="*" element={<Navigate to="/login"/>}/>
                                        </>
                                        :
                                        <>
                                            <Route path="*" element={<Navigate to="/"/>}/>
                                        </>
                                }
                            </>
                    }
                </Routes>

            </Suspense>
        </ThemeProvider>
    )
}

export default App
