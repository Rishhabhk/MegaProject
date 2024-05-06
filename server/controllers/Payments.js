const { instance } = require("razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { default: mongoose } = require("mongoose");


//capture the payment and inititate the razorpay
exports.capturePayment = async (req, res) => {
    try {
        //get courseId and userId
        const { course_id } = req.body;
        const userId = req.user.id;

        //validate
        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "invalid course"
            })
        }
        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "course not found"
            })
        }

        //if user already payed
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "course already bought",
                error:error.message
            })
        }

        //order course
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId
            }
        }

        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        //return res
        return res.status(200).json({
            success: true,
            message: "payment initiated",
            courseName: course.courseName,
            courseDesc: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "payment initiation failed",
            error:error.message
        })
    }
}

// verify signature pf razorPay and server
exports.verifySignature = async (req, res) => {
    const webhookSecret = "!2345678";

    const signature = req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is authorised");
        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            //fullfil the action

            //find the course and enroll student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                {
                    $push: {
                        studentsEnrolled: userId
                    }
                },
                { new: true }
            );

            if(!enrolledCourse){
                return res.status(400).json({
                    success: false,
                    message: "course not found"
                })
            }
            console.log(enrolledCourse);

            //find student and push course in Courses
            const enrolledStudent = await User.findByIdAndUpdate(
                {_id:userId},
                {
                    $push:{
                        courses:courseId
                    }
                },
                {new:true}
            )

            console.log(enrolledStudent);

            //confirmation male
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congrats from CodeHelp",
                "You have order a new course"
            );

            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "signature verified and course added"
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "signature verification failed",
                error:error.message

            })
        }
    }
    else{
        return res.status(500).json({
            success: false,
            message: "signature not matched",
            error:error.message
        })
    }
}
