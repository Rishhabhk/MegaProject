const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
    try {
        //fetch data
        const { title, duration, description, sectionId } = req.body;
        //extract file/video
        const video = req.files.videoFile;

        //validate
        if (!sectionId || !title || !duration || !video) {
            return res.status(400).json({
                success: false,
                message: "all fields required"
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create subsection
        const subsectionDetails = await SubSection.create({
            title,
            timeDuration: duration,
            description,
            videoUrl: uploadDetails.secure_url
        })
        //push it into the section by find by id and update
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: subsectionDetails._id
                }
            },
            { new: true }
        )

        //log updated section after populate

        //return res
        return res.status(200).json({
            success: true,
            message: "subsection created successfully",
            updatedSection
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "subsection cannot be created",
            error: error.message
        })
    }
}


//HW: update subsection

//HW: delete subsection