const bcrypt = require('bcrypt');
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");

require("dotenv").config();

//send otp 
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        //check if present
        const checkUserPresent = await User.findOne({ email });

        //if present, return response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already exist"
            })
        }

        //generateotp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("OTP generated - ", otp);

        //check unique otp or not
        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        //create entry in OTP db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//signup
exports.signUp = async (req, res) => {
    try {
        //data fetch from req
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        //cnf password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirmpassword do not match"
            })
        }

        //check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already exist"
            })
        }

        //find most recent otp in db
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        //validate otp
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "otp not found"
            })
        }
        else if (otp != recentOtp[0].otp) {    
            return res.status(400).json({
                success: false,
                message: "invalid otp"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in db
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,   //it is not in user db
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success: true,
            message: 'User successfully registered',
            user
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered',
        })
    }
}


//login
exports.login = async (req, res) => {
    try {
        //fetch data
        const { email, password } = req.body;

        //validate
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'Alll fields are required',
            })
        }

        //user registered or not
        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User do not exist',
            })
        }

        //password verify and generate jwt
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });
            user.token = token;
            user.password = undefined;

            //create cooke and send response
            const options = {
                expired: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'Logged in Successfully'
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect'
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failed'
        })
    }
}

//changepassword
exports.changePassword = async (req, res) => {
    //fetch data

    //get oldpassword, newpassword, confirmpassword

    //validate

    // update password in db

    //send mail - Password updated

    //return response
}
