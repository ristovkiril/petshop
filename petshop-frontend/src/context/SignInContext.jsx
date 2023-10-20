import React, {useEffect, useState} from "react";
import axios from "../axios/axios.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "../components/loading-screen/LoadingScreen.jsx";

export const TOKEN = "token"

export const SignInContext = React.createContext({
  isAuth: null,
  currentUser: null,
  onLogin: () => {
  },
  onRegister: () => {
  },
  onLogout: () => {
  },
})

export const SignInContextProvider = props => {
  const [isAuth, setIsAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkIsAuth();
  }, [isAuth])

  const checkIsAuth = async () => {
    try {
      if (isAuth === null) {
        if (localStorage.getItem(TOKEN)) {
          const responseUser = await axios.post('/api/user/me',null , {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`
            }
          });
          const user = responseUser.data;
          setCurrentUser(user);
          setIsAuth(true)
        } else {
          setIsAuth(false);
        }
      }
    } catch (error) {
      toast.error("Failed to load user");
      if (localStorage.getItem(TOKEN)) {
        localStorage.removeItem(TOKEN);
      }
      setIsAuth(false)
    }
  }

  const onLogin = async ({username, password}) => {
    try {
      console.log(username, password)
      const response = await axios.post(`/login`, { username, password });
      const serviceToken = response.data;
      console.log(response);
      localStorage.setItem(TOKEN, serviceToken);

      if (serviceToken) {
        const responseUser = await axios.post('/api/user/me');
        const user = responseUser.data;

        setCurrentUser(user);
        setIsAuth(true);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    }
  }

  const onRegister = async ({budged, email, password, name, lastname}) => {
    try {
      const response = await axios.post('/api/user', {
        email,
        password,
        name,
        lastname,
        budged
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to register");
    }
  }
  const onLogout = async () => {
    try {
      localStorage.removeItem(TOKEN);
      setIsAuth(false);
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  }

  return (
    <SignInContext.Provider
      value={{
        isAuth: isAuth,
        currentUser: currentUser,
        onLogin: onLogin,
        onLogout: onLogout,
        onRegister: onRegister
      }}
    >
      {isAuth === null ? <LoadingScreen/> : props.children}
    </SignInContext.Provider>
  )
}