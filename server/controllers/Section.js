const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        //data fecth
        const { sectionName, courseId } = req.body;

        //validate
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "missing data"
            })
        }

        //create section
        const newSection = await Section.create({ sectionName });

        // push section to course
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        //HW: use populate to replace sections subsection in updatedCourseDetails

        //return res
        return res.status(200).json({
            success: true,
            message: "new section created",
            updatedCourseDetails
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to create section",
            error: error.message
        })
    }
}



//update section
exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionId } = req.body;

        //vaidate
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "missing data"
            })
        }

        //find by id and update
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName: sectionName },
            { new: true }
        )

        //return res
        return res.status(200).json({
            success: true,
            message: "section updated successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to update section",
            error: error.message
        })
    }
}


//delete section
exports.deleteSection = async (req, res) => {
    try {
        //fetch data(assuming that we are sending id in params)
        const {sectionId } = req.body;

        //vaidate
        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "missing data"
            })
        }

        //find by id and delete
        await Section.findByIdAndDelete(sectionId)

        //return res
        return res.status(200).json({
            success: true,
            message: "section deleted successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to delete section",
            error: error.message
        })
    }
}
