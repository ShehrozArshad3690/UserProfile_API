const express = require('express');
const postController= require("../Controllers/postController");

const router = express.Router();

router.get("/posts", postController.getPost);
router.get("/post/:id", postController.getPostById);
router.post("/post/add", postController.addPost);
router.put("/post/update/:id", postController.updatePost);
router.delete("/post/delete/:id", postController.deletePost);

module.exports=router;
