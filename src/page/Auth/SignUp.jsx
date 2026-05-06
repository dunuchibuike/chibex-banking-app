import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
} from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // console.log(userDetails);
  return (
    <div className="login_container">
      <div className="login_card signup_card">
        <div className="login_header">
          <h1>Create Your Account</h1>
          <p>Join our bank and manage your finances</p>
        </div>

        <form className="login_form" onSubmit={""}>
          {/* Full Name Input */}
          <div className="form_group">
            <label htmlFor="name">Full Name</label>
            <div className="input_wrapper">
              <FaUser className="input_icon" />
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                onChange={""}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="form_group">
            <label htmlFor="email">Email Address</label>
            <div className="input_wrapper">
              <FaEnvelope className="input_icon" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={""}
              />
            </div>
          </div>

          {/* Account Number Input
          <div className="form_group">
            <label htmlFor="accountNumber">Account Number</label>
            <div className="input_wrapper">
              <FaIdCard className="input_icon" />
              <input
                type="text"
                id="accountNumber"
                placeholder="Enter account number"
              />
            </div>
          </div> */}

          {/* Password Input */}
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <div className="input_wrapper password_wrapper">
              <FaLock className="input_icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a strong password"
                onChange={""}
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

          {/* Confirm Password Input */}
          <div className="form_group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input_wrapper password_wrapper">
              <FaLock className="input_icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                onChange={""}
              />
              <button
                type="button"
                className="toggle_password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="form_group">
            <label className="terms_checkbox">
              <input type="checkbox" />
              <span>
                I agree to the{" "}
                <a href="#terms" className="terms_link">
                  Terms and Conditions
                </a>
              </span>
            </label>
          </div>

          {/* Signup Button */}
          <button type="submit" className="login_btn">
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <div className="signup_link">
          <p>
            Already have an account? <Link to="/">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
