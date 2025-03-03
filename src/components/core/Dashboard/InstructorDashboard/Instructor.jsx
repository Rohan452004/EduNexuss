import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import IncomeChart from "./IncomeChart";
import StudentsChart from "./StudentsChart";
import { Link } from "react-router-dom";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);

        setInstructorData(
          Array.isArray(instructorApiData) ? instructorApiData : []
        );
        setCourses(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
      setLoading(false);
    })();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalAmountGenerated || 0),
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalStudentsEnrolled || 0),
    0
  );

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-lg text-richblack-200">
          Let’s start something new today!
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-6">
          <div className="ml-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <p className="text-lg font-bold text-white">Total Courses</p>
              <p className="text-4xl font-semibold text-yellow-400">
                {courses.length}
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <p className="text-lg font-bold text-white">Total Students</p>
              <p className="text-4xl font-semibold text-yellow-400">
                {totalStudents}
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <p className="text-lg font-bold text-white">Total Income</p>
              <p className="text-4xl font-semibold text-yellow-400">
                Rs. {totalAmount}
              </p>
            </div>
          </div>
          <div className="ml-4 w-full flex flex-col gap-10 lg:flex-row lg:gap-20">
            <StudentsChart
              courses={instructorData}
              className="w-full min-w-[300px] sm:min-w-[350px] lg:min-w-[400px]"
            />
            <IncomeChart
              courses={instructorData}
              className="w-full min-w-[300px] sm:min-w-[350px] lg:min-w-[400px]"
            />
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold text-white">Your Courses</p>
              <Link
                to="/dashboard/my-courses"
                className="text-yellow-400 text-sm font-medium hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-lg font-semibold text-white">
                      {course.courseName}
                    </p>
                    <div className="text-gray-400 text-sm mt-2">
                      <span>
                        {course.studentsEnroled?.length || 0} students
                      </span>
                      <span className="mx-2">|</span>
                      <span>Rs. {course.price || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 bg-gray-900 p-10 rounded-lg text-center shadow-md">
          <p className="text-2xl font-bold text-white">
            You haven’t created any courses yet.
          </p>
          <Link
            to="/dashboard/add-course"
            className="text-yellow-400 text-lg font-medium mt-2 inline-block hover:underline"
          >
            Create a course
          </Link>
        </div>
      )}
    </div>
  );
}
