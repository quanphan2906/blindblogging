import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { PORT } from "../api_config/endpoints";

export const SocketContext = createContext();

function SocketContextProvider(props) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        let ws = io(PORT);
        setSocket(ws);
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("disconnect", () => {
                const ws = io(PORT);
                setSocket(ws);
            });
            return () => {
                socket.disconnect();
            };
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;
