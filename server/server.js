const config = require("./config/config");

//create the server
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

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
const errorHandler = require("./error_handler/errorHandler");
app.use(errorHandler);

//listen to new port
server.listen(config.PORT, () => {
  console.log("listen to port " + config.PORT);
});
