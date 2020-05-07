import io from "socket.io-client";
import { PORT } from "../api_config/endpoints";

function Socket() {
    if (Socket.instance) {
        return Socket.instance;
    }

    this.socket = io.connect(PORT);
    Socket.instance = this;
}

const ws = new Socket();
const socket = ws.socket;
export default socket;
