import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { FaChevronLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActive, setVideoActive] = useState("");
  const [showSidebar, setShowSidebar] = useState(true); // Initially, sidebar is visible
  const { courseId, sectionId, subsectionId } = useParams();
  const { courseSectionData, completedLectures, totalNoOfLectures } =
    useSelector((state) => state.viewCourse);
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseSectionData) return;
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    if (currentSectionIndex === -1) return;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((subSection) => subSection?._id === subsectionId);
    if (currentSubSectionIndex === -1) return;

    setActiveStatus(courseSectionData[currentSectionIndex]._id);
    setVideoActive(
      courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex]
        ._id
    );
  }, [courseSectionData, sectionId, subsectionId]);

  return (
    <>
      {/* Button to Show Sidebar (Top Left, Visible When Sidebar is Hidden) */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed top-16 left-2 z-30 bg-richblack-700 text-white p-2 rounded-md shadow-lg"
        >
          <FaAngleDoubleRight className="text-2xl" />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed ${
          showSidebar ? "w-[320px]" : "w-0"
        } transition-all duration-500 h-[calc(100vh-3.5rem)] bg-richblack-800 z-20 overflow-hidden`}
      >
        <div className="h-full flex flex-col border-r-[1px] border-richblack-700">
          {/* Sidebar Header */}
          <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
            <div className="flex w-full items-center justify-between">
              {/* First Button (Always Visible for Redirecting) */}
              <button
                onClick={() => navigate(`/dashboard/enrolled-courses`)}
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              >
                <FaChevronLeft />
              </button>

              {/* Review Button */}
              <IconBtn text={"Review"} onclick={() => setReviewModal(true)} />
            </div>
            <div className="flex flex-col">
              <p>My Courses</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} of {totalNoOfLectures} Lectures
                Completed
              </p>
            </div>
          </div>

          {/* Sections & Subsections List */}
          <div className="h-full overflow-y-auto px-2">
            {courseSectionData?.map((section, index) => (
              <details key={index} className="appearance-none text-richblack-5">
                <summary className="mt-2 cursor-pointer text-sm text-richblack-5">
                  <div className="flex justify-between bg-richblack-600 px-5 py-4">
                    <p className="w-[70%] font-semibold">
                      {section?.sectionName}
                    </p>
                    <div className="flex items-center gap-3">
                      <MdOutlineKeyboardArrowDown className="arrow" />
                    </div>
                  </div>
                </summary>

                {section?.subSection.map((subSection) => (
                  <div
                    key={subSection?._id}
                    className="transition-[height] duration-500 ease-in-out"
                  >
                    <div
                      onClick={() => {
                        setShowSidebar(false); // Hide sidebar when a lecture is clicked
                        navigate(
                          `/view-course/${courseId}/section/${section?._id}/sub-section/${subSection?._id}`
                        );
                      }}
                      className={`${
                        subSection?._id === videoActive
                          ? "bg-yellow-200"
                          : "bg-richblack-50"
                      } cursor-pointer flex gap-3 px-5 py-2 font-semibold text-richblack-800 relative border-b-[1px] border-richblack-600`}
                    >
                      <div className="absolute bottom-1">
                        <input
                          readOnly
                          checked={completedLectures?.includes(subSection?._id)}
                          type="checkbox"
                        />
                        <label className="check-box"></label>
                      </div>
                      <p className="ml-6">{subSection?.title}</p>
                    </div>
                  </div>
                ))}
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
