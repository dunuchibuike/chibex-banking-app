import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "./Login.css";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState("");

  return (
    <div className="login_container">
      <div className="login_card">
        <div className="login_header">
          <h1>Reset Your Password</h1>
          <p>Enter your email to receive reset instructions</p>
        </div>

        <form className="login_form" onSubmit={(event) => event.preventDefault()}>
          <div className="form_group">
            <label htmlFor="forgot-email">Email Address</label>
            <div className="input_wrapper">
              <FaEnvelope className="input_icon" />
              <input
                type="email"
                id="forgot-email"
                placeholder="Enter your email"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <button type="submit" className="login_btn" disabled>
            Password Reset Unavailable
          </button>
        </form>

        <div className="signup_link">
          <p><Link to="/">Back to login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
