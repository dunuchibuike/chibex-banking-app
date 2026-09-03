import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./page/Dashboard/DashBoard";
import Login from "./page/Auth/Login";
import SignUp from "./page/Auth/SignUp";
import ForgotPassword from "./page/Auth/ForgotPassword";
import NotFound from "./components/NotFound";
import Private from "./lib/Private"
// import LoginClass from "./page/Auth/LoginClass";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<Private/>}>
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/dashboard/:fullName" element={<DashBoard/>} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
