module.exports = (app) => {
    app.use((err, req, res, next) => {
        if (err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        next();
    });
    app.use((req, res, next) => {
        res.status(404).json({ message: "Not found" });
    });
};
