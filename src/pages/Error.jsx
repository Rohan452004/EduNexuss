import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      <h1 className="text-7xl font-bold text-red-500 animate-pulse">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Oops! Page Not Found</h2>
      <p className="mt-2 text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/dashboard/my-profile"
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
