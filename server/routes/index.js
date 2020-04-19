const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");

const router = require("express").Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

module.exports = router;
