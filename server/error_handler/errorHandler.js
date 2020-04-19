const router = require("express").Router();

router.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  next();
});

router.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
