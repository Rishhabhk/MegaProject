const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcypt = require("bcrypt");
const crypto = require("crypto");

//reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        //fetch email
        const { email } = req.body;

        // check if email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User is not registered'
            })
        }
        //generate token
        // const token = crytpo.randomUUID();
        const token = crypto.randomBytes(20).toString("hex");

        //update user by addng token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true });
            console.log("details ", updatedDetails);

        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail containing the url
        await mailSender(email, "Pasword reset link", `Password Reset Link: ${url}`);

        //return response
        return res.status(200).json({
            success: true,
            message: 'Email sent successfully, check mail to change password'
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'something went wrong while sending mail to reset password',
            error:error.message
        })
    }



}


//reset password
exports.resetPassword = async (req, res) => {
    try {
        //fetch data
        const { password, confirmPassword, token } = req.body;

        //validate
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'password do not match with confirm password'
            })
        }

        //get userDetails from db using token
        const userDetails = await User.findOne({ token })

        //if no entry- invalid token
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'token is invalid'
            })
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: 'Token is expired, please regenerate your token'
            });
        }

        //hash password
        const hashedPassword = await bcypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        )
        //return response
        return res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'error while resetting password '
        })
    }
}