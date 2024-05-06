//import required modules
const express = require("express");
const router = express.Router();

const {capturePayment, verifySignature} = require("../controllers/Payments");
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

router.post("/capture-payment", auth, isStudent, capturePayment);
router.post("/verify-signature", auth,verifySignature);

module.exports = router