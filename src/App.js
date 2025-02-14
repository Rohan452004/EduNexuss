import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/common/Navbar";

function App(){
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="signup"
          element={
            // <OpenRoute>
            <SignUp />
            // </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            // <OpenRoute>
            <Login />
            // </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
