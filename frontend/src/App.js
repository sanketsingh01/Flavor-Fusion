import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import NotFoundPage from "./components/pages/NotFoundPage";
import Menu from "./components/Menu";
import About from "./components/About";
import Signup from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import Booking from "./components/Booking";
import Profile from "./components/Profile";

import LoginProtectedRoute from "./components/utlis/LoginProtectedRoute.js";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {" "}
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/Menu" element={<Menu />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/bookTable" element={<Booking />}></Route>
          <Route
            path="/profile"
            element={
              <LoginProtectedRoute>
                <Profile />
              </LoginProtectedRoute>
            }
          ></Route>
        </Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
