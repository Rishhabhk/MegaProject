const Category = require('../models/Category');

//create category handler function
exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const { name, description } = req.body;

        //validate data
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category is created successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//showAllcategory handler function
exports.showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true })
        return res.status(200).json({
            success: true,
            message: "All Category are fetched successfully",
            allCategory
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//category page details
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        //get course for specified category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        console.log(selectedCategory);

        //handle the case when category is not found
        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message: "category not found"
            })
        }

        //handle the case when there are not oourses
        if (selectedCategory.courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "no courses found for the selected category."
            })
        }

        // const selectedCourses = selectedCategory.courses;

        //get course for other categories
        const categoryExceptSelected = await Category.find({
            _id: { $ne: categoryId }
        }).populate("courses").exec();

        // let differentCourses = [];
        // for (const category of categoryExceptSelected) {
        //     differentCourses.push(...category.courses);
        // }

        //get top-selling courses across all categories
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

        return res.status(200).json({
            success: true,
            message: "All courses fetched",
            data: {
                selectedCategory,
                categoryExceptSelected,
                mostSellingCourses
            }
            // selectedCourses: selectedCourses,
            // differentCourses: differentCourses,
            // mostSellingCourses: mostSellingCourses
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
