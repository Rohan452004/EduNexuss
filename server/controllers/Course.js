const Course = require("../models/Course")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")

// Function to create a new course
exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tag,
        category,
    } = req.body

    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }

    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid
    const CategoryDetails = await category.findById(tag)
    if (!CategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details Not Found",
      })
    }

    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)

    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category:CategoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {  _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )

    // Add the new course to the Categories
    const Categorydetails2 = await Category.findByIdAndUpdate(
      { _id: CategoryDetails._id },
      { 
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", Categorydetails2)

    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}

// Get Course List
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec()

    return res.status(200).json({
      success: true,
      data: allCourses,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    })
  }
}

// Get Course details
exports.getCourseDetails = async (req, res) => {
  try{
      // get id
      const {courseId} = req.body;
      // find course
      const courseDetails = await Course.find({
        _id: courseId,
      }).populate({
        path: "instructor",
        populate: {
          path: "addiditionalDetails",
        },
      })
      .populate('category')
      .populate('ratingAndReviews')
      .populate({
        path:'courseContent',
        populate:{
          path:'subSection'
        }
      })
      .exec();

      //validation
      if(!courseDetails){
        return res.status(404).json({
          success: false,
          message: `Course Not Found with course id: ${courseId}`,
        })
      }

      return res.status(200).json({
        success: true,
        message:"Course Detail Found Successfully",
        data: courseDetails,
      })

  } catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Can\'t Fetch Course Details',
      error: error.message,
    })
  }
}