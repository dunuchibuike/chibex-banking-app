import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash, FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";
import { BaseURL, INITIAL_ACCOUNT_BALANCE, ValidateInputs } from "../../lib/HighFunction";
import { AuthScene } from "./Login";

const Eye = ({ shown, onClick }) => (
  <button type="button" className="toggle_password" onClick={onClick} aria-label={shown ? "Hide password" : "Show password"}>
    {shown ? <FaRegEyeSlash /> : <FaRegEye />}
  </button>
);

const getSignupErrorMessage = (error) => {
  const data = error.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  if (error.request && !error.response) return "Unable to reach the signup server. Please check your internet connection and try again.";
  return error.message || "Signup failed. Please try again.";
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ fullName: "", emailAddress: "", password: "", confirmPassword: "" });
  const [errorMsg, setErrorMsg] = useState({ err: false, name: "", msg: "" });

  const update = (field, value) => {
    setUserInfo((current) => ({ ...current, [field]: value }));
    if (field === "confirmPassword" && value && value !== userInfo.password) {
      setErrorMsg({ err: true, name: field, msg: "Passwords do not match" });
    } else {
      setErrorMsg({ err: false, name: "", msg: "" });
    }
  };

  const score = [userInfo.password.length >= 8, /[A-Z]/.test(userInfo.password), /[a-z]/.test(userInfo.password), /\d/.test(userInfo.password), /[^A-Za-z0-9]/.test(userInfo.password)].filter(Boolean).length;
  const strength = score < 3 ? "Weak" : score < 5 ? "Good" : "Strong";
  const colors = { Weak: "#c9747a", Good: "#d5aa72", Strong: "#89bda6" };

  const next = () => {
    if (!userInfo.fullName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.emailAddress)) {
      setErrorMsg({ err: true, name: "general", msg: "Enter your full name and a valid email address." });
      return;
    }
    setErrorMsg({ err: false, name: "", msg: "" });
    setStep(2);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!ValidateInputs(userInfo, errorMsg, setErrorMsg)) return;
    if (userInfo.password !== userInfo.confirmPassword) {
      setErrorMsg({ err: true, name: "confirmPassword", msg: "Passwords do not match" });
      return;
    }
    if (!BaseURL) {
      setErrorMsg({ err: true, name: "general", msg: "Signup server is not configured. Add VITE_BASE_URL on Vercel and redeploy." });
      return;
    }
    setLoading(true);
    try {
      const payload = { fullName: userInfo.fullName.trim(), emailAddress: userInfo.emailAddress.trim().toLowerCase(), password: userInfo.password, initialBalance: INITIAL_ACCOUNT_BALANCE };
      const response = await axios.post(`${BaseURL}/register`, payload);
      alert(response.data?.message || "Account created successfully");
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error.response?.status, error.response?.data || error.message);
      setErrorMsg({ err: true, name: "general", msg: getSignupErrorMessage(error) });
    } finally { setLoading(false); }
  };

  return <div className="login_container"><AuthScene /><main className="auth_panel"><section className="login_card signup_card"><header className="login_header"><span className="eyebrow">Open an account</span><h1>Build your financial home</h1><p>It takes less than two minutes to get started.</p></header><div className="step_progress" aria-label={`Step ${step} of 2`}><i className="active" /><i className={step === 2 ? "active" : ""} /></div><form className="login_form" onSubmit={handleSignUp}>{step === 1 ? <div className="form_step"><div className="form_group"><label htmlFor="name">Legal name</label><div className="input_wrapper"><FaUser className="input_icon" /><input id="name" value={userInfo.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Your full name" autoComplete="name" /></div></div><div className="form_group form_group_spaced"><label htmlFor="signup-email">Email address</label><div className="input_wrapper"><FaEnvelope className="input_icon" /><input type="email" id="signup-email" value={userInfo.emailAddress} onChange={(event) => update("emailAddress", event.target.value)} placeholder="you@example.com" autoComplete="email" /></div></div>{errorMsg.name === "general" && <span className="error_text">{errorMsg.msg}</span>}<button type="button" className="login_btn full_width_btn" onClick={next}>Continue</button></div> : <div className="form_step"><div className="form_group"><label htmlFor="signup-password">Create password</label><div className="input_wrapper"><FaLock className="input_icon" /><input type={showPassword ? "text" : "password"} id="signup-password" value={userInfo.password} onChange={(event) => update("password", event.target.value)} onFocus={() => setFocused(true)} placeholder="At least 8 characters" autoComplete="new-password" /><Eye shown={showPassword} onClick={() => setShowPassword(!showPassword)} /></div>{userInfo.password && <><div className="password_meter"><i style={{ width: `${Math.max(20, score * 20)}%`, background: colors[strength] }} /></div><span className="strength_label">Password strength: {strength}</span></>}{focused && <div className="requirements"><p className={userInfo.password.length >= 8 ? "met" : ""}><FaCheck /> 8+ characters</p><p className={/[A-Z]/.test(userInfo.password) ? "met" : ""}><FaCheck /> uppercase</p><p className={/\d/.test(userInfo.password) ? "met" : ""}><FaCheck /> number</p><p className={/[^A-Za-z0-9]/.test(userInfo.password) ? "met" : ""}><FaCheck /> symbol</p></div>}</div><div className="form_group"><label htmlFor="confirm-password">Confirm password</label><div className="input_wrapper"><FaLock className="input_icon" /><input type={showConfirm ? "text" : "password"} id="confirm-password" value={userInfo.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} placeholder="Repeat your password" autoComplete="new-password" /><Eye shown={showConfirm} onClick={() => setShowConfirm(!showConfirm)} /></div><span className="field_error">{errorMsg.name === "confirmPassword" ? errorMsg.msg : ""}</span></div>{errorMsg.name === "general" && <span className="error_text">{errorMsg.msg}</span>}<label className="terms_checkbox"><input type="checkbox" required /><span>I agree to the <a href="#terms" className="terms_link">Terms and Conditions</a></span></label><div className="step_actions"><button className="secondary_btn" type="button" onClick={() => setStep(1)}>Back</button><button type="submit" className={`login_btn ${loading ? "loading" : ""}`} disabled={loading}>{loading ? "Creating account..." : "Create account"}</button></div></div>}</form><div className="signup_link"><p>Already a member? <Link to="/">Sign in</Link></p></div></section></main></div>;
};

export default SignUp;
