import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <div className="mx-auto w-11/12 max-w-[1000px] ">
        <div className="text-3xl font-semibold text-white">
          Enrolled Courses
        </div>

        {!enrolledCourses ? (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : !enrolledCourses.length ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <p className="text-lg text-gray-400 text-white">
              You have not enrolled in any course yet.
            </p>
            <p className="text-sm text-gray-500 text-white">
              Start learning by exploring our course catalog.
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="my-8 text-white">
            {/* Headings */}
            <div className="flex rounded-t-lg bg-richblack-500">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className=" hidden md:block w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>

            {/* Course List */}
            {enrolledCourses.map((course, i, arr) => (
  <div
    className={`flex flex-col md:flex-row items-center border border-richblack-700 ${
      i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
    }`}
    key={i}
  >
    <div
      className="flex w-full md:w-[45%] cursor-pointer items-center gap-4 px-5 py-3 hover:bg-richblack-600 transition duration-200"
      onClick={() => {
        navigate(
          `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
        );
      }}
    >
      <img
        src={course.thumbnail}
        alt="course_img"
        className="h-14 w-14 rounded-lg object-cover"
      />
      <div className="flex flex-col max-w-xs gap-2">
        <p className="font-semibold">{course.courseName}</p>
        <p className="hidden md:block text-xs text-gray-400">
          {course.courseDescription.length > 50
            ? `${course.courseDescription.slice(0, 50)}...`
            : course.courseDescription}
        </p>
      </div>
    </div>

    {/* Hide duration in mobile view */}
    <div className="hidden md:block w-1/4 px-2 py-3">
      {course?.totalDuration || "0s"}
    </div>

    {/* Move progress section to bottom in mobile view */}
    <div className="flex w-full md:w-1/5 flex-col gap-2 px-2 py-3 order-last md:order-none">
      <p>Progress: {course.progressPercentage || 0}%</p>
      <ProgressBar
        completed={course.progressPercentage || 0}
        height="8px"
        isLabelVisible={false}
      />
    </div>
  </div>
))}

              
          </div>
        )}
      </div>
    </>
  );
}
