const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    whatYouWillLearn: {
        type: String,
        required: true
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReviews"
        }
    ],
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String
    },
    tag: {
        type: [String],
        ref: "Tag"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    instructions:{
        type:[String]
    },
    status:{
        type:String,
        enum:["Draft", "Published"]
    }

})

module.exports = mongoose.model("Course", courseSchema)