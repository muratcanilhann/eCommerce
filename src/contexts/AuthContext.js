import { useState, createContext, useEffect, useContext } from "react";
import { fetchLogout, fetchMe } from "../api";
import { Spinner,Flex } from "@chakra-ui/react";

const AuthContect = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUserAdmin, setIsUserAdmin] = useState(false);


    useEffect(() => {
        (async () => {
        try {
        const me = await fetchMe();
        setLoggedIn(true);
        setUser(me);
        setLoading(false);
        
        } catch (error) {
        setLoading(false);

        }
        
        })();
    }, []);



    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);

        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);

    };

    const logout = async (callback) =>{
        setLoggedIn(false);
        setUser(null);

        await fetchLogout();

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');

        callback();
    }








    const values = {
        loggedIn,
        user,
        login,
        logout,
        isUserAdmin,
    };

    if (loading) {
        return <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size={"xl"} color="red.500">

            </Spinner>
        </Flex>
    }
    
    return <AuthContect.Provider value={values}>{children}</AuthContect.Provider>

};

const useAuth = () => useContext(AuthContect);

export {
    AuthProvider,
    useAuth
};

