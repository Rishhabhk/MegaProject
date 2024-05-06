const express = require("express");
const router = express.Router();

const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");
const {createCourse,showAllCourses, getCourseDetails} = require("../controllers/Course");
const {createSection,updateSection, deleteSection} = require("../controllers/Section");
// const {createSubSection,updateSubSection, deleteSubSection} = require("../controllers/SubSection");
const {createSubSection} = require("../controllers/SubSection");
const {createCategory, showAllCategory, categoryPageDetails} = require("../controllers/Category");
const {createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReviews");

//course
router.post("/create-course", auth, isInstructor, createCourse);
router.get("/show-all-courses", auth, showAllCourses);
router.get("/get-course-details", auth, getCourseDetails);

// section
router.post("/create-section", auth, isInstructor, createSection);
router.put("/update-section", auth, isInstructor, updateSection);
router.delete("/delete-section", auth, isInstructor, deleteSection);

// subsection
router.post("/create-sub-section", auth, isInstructor, createSubSection);

// rating and review
router.post("/create-rating", auth, isStudent, createRating);
router.get("/get-average-rating", getAverageRating);
router.get("/get-all-rating", getAllRating);



//category
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);
router.get("/categoryPageDetails", categoryPageDetails);




module.exports = router;