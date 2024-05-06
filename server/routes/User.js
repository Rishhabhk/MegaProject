const express = require("express");
const router = express.Router();

const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");
const {sendOTP, signUp, login, changePassword} = require("../controllers/Auth");


router.post("/login", login);
router.post("/sign-up", signUp);
router.post("/send-OTP", sendOTP);
router.put("/change-password",auth ,changePassword);


module.exports = router;