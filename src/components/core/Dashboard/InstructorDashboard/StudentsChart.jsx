import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function StudentsChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors
  const generateRandomColors = (numColors) => {
    return Array.from({ length: numColors }, () => {
      return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
    });
  };

  // Chart data
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff", // Makes legend text visible in dark mode
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center sm:items-start gap-y-4 rounded-md bg-richblack-800 p-4 sm:p-6 w-full">
      <p className="text-lg font-bold text-richblack-5 text-center sm:text-left">
        Visualize: Student per Course
      </p>
      <div className="w-full h-[200px] sm:h-[200px] md:h-[200px] lg:h-[200px]">
        <Pie data={chartDataStudents} options={options} />
      </div>
    </div>
  );
}
