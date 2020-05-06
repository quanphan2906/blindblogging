import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { PORT } from "../api_config/endpoints";

export const SocketContext = createContext();

function SocketContextProvider(props) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketTemp = io(PORT);
        setSocket(socketTemp);
    }, []);

    useEffect(() => {
        if (!socket) return;
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;
