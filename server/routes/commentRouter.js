const router = require("express").Router();

router.get("/");
//getting comments with id of a post

router.post("/create");
//create a comment, in the req.body needs postId and userId

router.put("/:id");
//changing content of a comment

router.delete("/:id");
//delete a comment completely

module.exports = router;
