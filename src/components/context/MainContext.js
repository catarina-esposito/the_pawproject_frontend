import { createContext, useContext, useEffect, useState } from 'react';
import {baseURL} from '../utils/const';
import Loader from '../common/Loader';

export const MainContext = createContext();

export const CURRENT_USER_KEY = 'currentUser';

const fetcher = (url) =>
    fetch(url, {
        mode: 'cors',
        credentials: "include"
    }).then((d) =>
        d.ok ? d.json() : Promise.reject(d)
    );


export const MainProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetcher(`${baseURL}users/get-current-user`).then(
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
                isAuthenticated: currentUser !== undefined,
                updateCurrentUser: (currentUser) => {
                    setCurrentUser(currentUser);
                }
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext);
