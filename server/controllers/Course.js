const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//createCourse
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
        const thumbnail = req.files.thumbnailImage;

        //validate
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);

        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "instructor details not found"
            })
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "category not found"
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url
        })

        //add new course to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true }
        )

        //update the category schema(add course to that category schema)
        //HW

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Course cannot be created " + error.message
        })
    }
}


//getAllCourses
exports.showAllCourses = async (req, res) => {
    try {
        //todo: change the below statement
        const allCourses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: "All courses fetched",
            data: allCourses
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "cannot fidn all courses"
        })
    }
}


//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
        //get id
        const { courseId } = req.body;

        //find course details
        const courseDetails = await Course.findById({ _id: courseId })
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            )
            .exec()

            //validate
            if(!courseDetails){
                return res.status(400).json({
                    success:false,
                    message:"could not find the course"
                })
            }

            //return res
            return res.status(200).json({
                success:true,
                message:"course details fetched successfully",
                data:courseDetails
            })
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"error while fetching course details",
            error:error.message
        })
    }
}