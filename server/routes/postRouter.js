const router = require("express").Router();

router.get("/");
//get all posts with conditions
//3 most recent posts

//posts with a specific topic
//paginate according to condition -> most recent or most like?

//search on title
//if want to search on author
//query1: find in User collection that name -> retrieve the id(s)
//query2: find the posts having that id(s)

router.post("/create");
//post new post

router.route("/:id");
//all methods except post
//also populate the comment field

module.exports = router;
