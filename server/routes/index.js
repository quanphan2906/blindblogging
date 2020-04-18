const router = require("express").Router();

router.use("/api", (req, res, next) => {
    res.json({ message: "hello world" });
});

module.exports = router;
