const express = require('express');
const pController= require("../Controllers/profileController");

const router = express.Router();

router.get("/profiles", pController.getProfile);
router.get("/profile/:userId", pController.getProfileById);
router.post("/profile/add", pController.addProfile);
router.put("/profile/update/:userId", pController.updateProfile);
router.delete("/profile/delete/:userId", pController.deleteProfile);

module.exports=router;
