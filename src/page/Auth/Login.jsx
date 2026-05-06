import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { FaRegEye, FaRegEyeSlash, FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login_container">
      <div className="login_card">
        <div className="login_header">
          <h1>Bank Login</h1>
          <p>Secure access to your account</p>
        </div>

        <form className="login_form">
          {/* Email Input */}
          <div className="form_group">
            <label htmlFor="email">Email Address</label>
            <div className="input_wrapper">
              <FaUser className="input_icon" />
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
          </div>

          {/* Password Input */}
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <div className="input_wrapper password_wrapper">
              <FaLock className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="remember_forgot">
            <label className="remember_me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot_link">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="login_btn">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="signup_link">
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
