const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try{
        //fetech data
        // const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        const {dateOfBirth="", about="", contactNumber} = req.body;

        const id = req.user.id;

        //validate
        if(!contactNumber || !id){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileID = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileID);

        //update profile
        profileDetails.datOfBirth = dateOfBirth;
        profileDetails.about = about;
        // profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        //return res
        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            profileDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot update profile",
            error:error.message
        })
    }
}



//explore : how can we schedule this delete(cron job)

//delete acoount
exports.deleteAccount = async (req, res) => {
    try{
        //fetch data
        const id = req.user.id;

        //validate
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        //todo: unenroll user from all all enrolled courses

        //delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);


        //delete user
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"deleted user and profile successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot delete user and profile",
            error:error.message
        })
    }
}


//get all user details
exports.getAllUserDetails = async (req, res) => {
    try{
        //fetch data
        const id = req.user.id;

        //vaildate
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        
        //return res
        return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"user data not found",
            error:error.message
        })
    }
}