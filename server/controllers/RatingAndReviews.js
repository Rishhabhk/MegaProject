const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//create rating
exports.createRating = async (req, res) => {
    try {
        //get user
        const userId = req.user.id;

        //fetch data from req body
        const { rating, review, courseId } = req.body;

        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $eleMatch: { $eq: userId } }
            });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "student is not enrolled"
            })
        }

        //check if user already reviewd the course
        const alreadyReviewed = await RatingAndReviews.findOne({
            user: userId,
            course: courseId
        })
        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "user already reviewed"
            })
        }

        //creating review 
        const ratingRaview = await RatingAndReviews.create({
            rating,
            review,
            user: userId,
            course: courseId
        });

        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: ratingRaview._id
                }
            },
            { new: true });

        console.log(updatedCourseDetails)

        //return res
        return res.status(200).json({
            success: true,
            message: "rating review successfull",
            ratingRaview
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "rating review failed",
            error: error.message
        })
    }
}


//get Rating
exports.getAverageRating = async (req, res) => {
    try{
        //get course
        const courseId = req.body.courseId;

        //calculate avg
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ]);

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            })
        }

        //if no ratings yet
        return res.status(200).json({
            success:true,
            message:"avg rating is 0, since no ratings yet",
            averageRating:0
        })

        //reutnr avg rating
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "error while finding avg rating",
            error: error.message
        })
    }
}


//get all rating and reviews
exports.getAllRating = async (req, res) => {
    try{
        const allReviews = await RatingAndReviews.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select: "CourseName"
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "all rating and reviews fetched",
            data:allReviews
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "error while finding all rating and reviews",
            error: error.message
        })
    }
}
