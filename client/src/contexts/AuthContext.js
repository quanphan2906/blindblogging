import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import endpoints from "../api_config/endpoints";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const tokenStr = localStorage.getItem("JWT token");
        if (!tokenStr) return;
        const tokenObj = JSON.parse(tokenStr);

        const now = new Date();
        const currentTime = now.getTime();

        if (currentTime >= tokenObj.expiry) {
            localStorage.removeItem("JWT token");
        } else {
            try {
                const { userId } = jwtDecode(tokenObj.token);
                const fetchData = async (token) => {
                    const res = await Axios.get(
                        endpoints.GET_PROFILE_ID(userId)
                    );
                    const {
                        data: { user },
                    } = res;
                    setAuth(user);
                };
                fetchData(userId);
            } catch (err) {
                console.log("Error has occured", err);
            }
        }
    }, []);
    return (
        <AuthContext.Provider value={{ ...auth }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
