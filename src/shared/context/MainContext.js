import { createContext, useContext, useEffect, useState } from 'react';
import { baseURL } from '../util/const';
import Loader from '../../components/Loader/Loader';

export const MainContext = createContext();

export const CURRENT_USER_KEY = 'currentUser';

const fetcher = (url, params) =>
    fetch(url, {
        mode: 'cors',
        credentials: "include",
        ...params
    }).then((d) =>
        d.ok ? d.json() : Promise.reject(d)
    );


export const MainProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        setIsLoading(false);
        setCurrentUser(undefined);
    }
    
    const handleLogin = (user) => {
        if (user) {
            setIsLoading(false);
            setCurrentUser(user);
        }
    } 

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    useEffect(() => {
        const theme = darkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
    }, [darkMode]);

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("token"))
        if (!token) {
            setIsLoading(false);
            setCurrentUser(undefined);
            return
        }
        fetcher(`${baseURL}/users/get-current-user`, {
            headers: {
                "authorization": `Bearer ${token.token}`
            }
        }).then(
            currentUser => {
                setIsLoading(false);
                setCurrentUser(currentUser);
            }
        ).catch(
            err => {
                setIsLoading(false);
            }
        )
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <MainContext.Provider
            value={{
                currentUser,
                handleLogout,
                handleLogin,
                isAuthenticated: currentUser !== undefined,
                updateCurrentUser: (currentUser) => {
                    setCurrentUser(currentUser);
                },
                darkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext);
