const AppError = require("./AppError");

const thirdPartyErrorHandler = (err) => {
    let message = err.message;
    let statusCode = err.statusCode;
    switch (err.name) {
        //mongoose errors
        case "CastError":
            message = `Invalid ${err.path}: ${err.value}`;
            statusCode = 400;
            break;
        case 11000:
            message = `Duplicate field value. Please use another value!`;
            statusCode = 400;
            break;
        case "ValidationError":
            let errorMsg = Object.values(err.errors).map((el) => el.message);
            message = `Invalid input data. ${errorMsg.join(". ")}`;
            statusCode = 400;
            break;
        //JWT errors
        case "JsonWebTokenError":
            message = `Invalid JWT token`;
            statusCode = 401;
            break;
    }
    return new AppError(message, statusCode);
};

module.exports = (app) => {
    app.use((err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Internal server error";
        const error = thirdPartyErrorHandler(err);
        return res
            .status(error.statusCode)
            .json({ message: error.message, statusCode: error.statusCode });
    });

    app.use((req, res, next) => {
        res.status(404).json({ message: "Not found" });
    });
};
