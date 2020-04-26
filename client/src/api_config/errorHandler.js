const errorHandler = (error) => {
    if (error.response) {
        console.log(error.response.status + " " + error.response.data.message);
    } else if (error.request) {
        console.log("No response received");
        console.log("Error request", error.request);
    } else {
        console.log("Error setting up request");
        console.log("Error", error.message);
    }
    console.log("Error config", error.config);
};

export default errorHandler;
