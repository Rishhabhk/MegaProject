const express = require("express");
const router = express.Router();

const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
} = require("../controllers/Profile");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");


router.put("/update-profile", auth, updateProfile);
router.delete("/delete-account", auth, deleteAccount);
router.get("/get-all-user-details", auth, getAllUserDetails);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);



module.exports = router;