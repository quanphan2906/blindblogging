const config = require("./config/config");

//create the server
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

//connect to db
const mongoose = require("mongoose");
mongoose
    .connect(config.MONGO_ATLAS_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch(() => {
        console.log("error connect to db");
    });
mongoose.set("useFindAndModify", false);

//allow CORS
const cors = require("cors");
app.use(cors());

//parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route handling
const router = require("./routes/index");
app.use("/api", router);

//error handling
require("./error_handler/errorHandler")(app);

//set up websocket
const socketio = require("socket.io");
const io = socketio(server);
io.on("connection", (socket) => {
    require("./socket_event_handlers/index")(io, socket);
});

//listen to new port
server.listen(config.PORT, () => {
    console.log("listen to port " + config.PORT);
});
