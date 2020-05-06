import React, { createContext, useState, useEffect, useRef } from "react";
import Axios from "axios";
import endpoints from "../api_config/endpoints";
import jwtDecode from "jwt-decode";
import validateJwt from "../helpers/validateJwt";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({});
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const didMountRef = useRef(false);

    const getJWTToken = () => {
        const { token } = validateJwt();
        setToken(token);
    };

    useEffect(() => {
        getJWTToken();
        window.addEventListener("storage", getJWTToken);
        return () => {
            window.removeEventListener("storage", getJWTToken);
        };
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            if (!token) {
                setAuth(null);
                setIsLoading(false);
                return;
            }

            try {
                const { userId } = jwtDecode(token);

                const fetchData = async (id) => {
                    const res = await Axios.get(endpoints.GET_PROFILE_ID(id));

                    const {
                        data: { user },
                    } = res;

                    setAuth(user);
                    setIsLoading(false);
                };

                fetchData(userId);
            } catch (err) {
                console.log("Error has occured", err);
                setIsLoading(false);
                setError(err);
            }
        } else {
            didMountRef.current = true;
        }
    }, [token]);

    const handleAuthChange = (newAuth) => {
        setAuth(newAuth);
    };

    const handleTokenChange = (newToken) => {
        setToken(newToken);
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                isLoading,
                handleAuthChange,
                token,
                handleTokenChange,
                error,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
