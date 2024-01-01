const express = require('express');
const uController= require("../Controllers/userController");

const router = express.Router();

router.get("/users",  uController.getUser);
router.get("/user/:id", uController.getUserById);
router.post("/user/add", uController.addUser);
router.put("/user/update/:id", uController.updateUser);
router.delete("/user/delete/:id", uController.deleteUser);

module.exports=router;
