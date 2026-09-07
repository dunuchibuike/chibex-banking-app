import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaFingerprint, FaLock, FaRegEye, FaRegEyeSlash, FaShieldAlt, FaUser } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const AuthScene = () => <aside className="auth_scene"><div className="brand">CHIBEX<span> / PRIVATE</span></div><div className="scene_copy"><span className="eyebrow">Private banking, reimagined</span><div className="security_orb"><FaShieldAlt /></div><h2>Your money,<br />in clear view.</h2><p>Thoughtfully secure financial tools for the life you are building.</p></div><div className="network-status"><i />All systems secure · 256-bit encryption</div></aside>;

const getTokenUserId = (token) => {
  try {
    const encodedPayload = token.split(".")[1]?.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(encodedPayload));
    return payload.id || payload.userId || payload._id || "";
  } catch {
    return "";
  }
};

const getErrorMessage = (error) => {
  const data = error.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  return data?.message || data?.error || error.message || "Login failed";
};

const getSessionToken = (response) => {
  const data = response?.data;
  const candidates = [
    data?.token,
    data?.accessToken,
    data?.jwt,
    data?.jwtToken,
    data?.authToken,
    data?.access_token,
    data?.data?.token,
    data?.data?.accessToken,
    data?.data?.jwt,
    data?.data?.jwtToken,
    data?.data?.authToken,
    data?.result?.token,
    data?.result?.accessToken,
    data?.result?.jwt,
    data?.user?.token,
    data?.user?.accessToken,
    data?.user?.jwt,
    response?.headers?.authorization,
    response?.headers?.Authorization,
    typeof data === "string" ? data : "",
  ];

  const token = candidates.find((candidate) => typeof candidate === "string" && candidate.trim());
  return token?.trim().replace(/^Bearer\s+/i, "") ?? "";
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ emailAddress: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({ err: false, name: "", msg: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const update = (field, value) => {
    setUserInfo((current) => ({ ...current, [field]: value }));
    if (!value.trim()) {
      setErrorMsg({ err: true, name: field === "emailAddress" ? "email" : "password", msg: `Enter your ${field === "emailAddress" ? "email" : "password"}` });
    } else {
      setErrorMsg({ err: false, name: "", msg: "" });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!userInfo.emailAddress.trim() || !userInfo.password.trim()) {
      setErrorMsg({ err: true, name: "general", msg: "Enter your email and password" });
      return;
    }
    if (!baseURL) {
      setErrorMsg({ err: true, name: "general", msg: "Login server is not configured." });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/login`, userInfo);

      // The API may return the session directly or wrap it in { data: { ... } }.
      const responseData = response?.data ?? {};
      const session = responseData?.data ?? responseData?.result ?? responseData;
      const token = getSessionToken(response);
      const user = session?.user ?? session?.userInfo ?? responseData?.user ?? responseData?.userInfo ?? {};
      const userId = user?._id ?? user?.id ?? user?.userId ?? session?.userId ?? responseData?.userId ?? getTokenUserId(token);

      if (!token) {
        throw new Error(responseData?.message || "Login succeeded, but no session token was returned.");
      }

      localStorage.setItem("token", token);
      if (userId) localStorage.setItem("Id", userId);
      setUser(user);

      const fullName = user?.fullName ?? user?.name ?? "";
      navigate(fullName ? `/dashboard/${encodeURIComponent(fullName)}` : "/dashboard");
      alert(responseData?.message ?? session?.message ?? "Login successful");
    } catch (error) {
      setErrorMsg({ err: true, name: "general", msg: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  return <div className="login_container"><AuthScene /><main className="auth_panel"><section className="login_card"><header className="login_header"><span className="eyebrow">Welcome back</span><h1>Access your account</h1><p>Your dashboard is protected with bank-grade security.</p></header><form className="login_form" onSubmit={handleLogin}><div className="form_group"><label htmlFor="email">Email address</label><div className="input_wrapper"><FaUser className="input_icon" /><input type="email" id="email" placeholder="you@example.com" value={userInfo.emailAddress} onChange={(event) => update("emailAddress", event.target.value)} autoComplete="email" /></div><span className="field_error">{errorMsg.name === "email" ? errorMsg.msg : ""}</span></div><div className="form_group"><label htmlFor="password">Password</label><div className="input_wrapper password_wrapper"><FaLock className="input_icon" /><input type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" value={userInfo.password} onChange={(event) => update("password", event.target.value)} autoComplete="current-password" /><button type="button" className="toggle_password" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</button></div><span className="field_error">{errorMsg.name === "password" ? errorMsg.msg : ""}</span></div>{errorMsg.name === "general" && <span className="error_text">{errorMsg.msg}</span>}<div className="remember_forgot"><label className="remember_me"><input type="checkbox" /><span>Keep me signed in</span></label><Link to="/forgot-password" className="forgot_link">Forgot password?</Link></div><button type="submit" className={`login_btn ${loading ? "loading" : ""}`} disabled={loading}>{loading ? "Unlocking account…" : "Continue securely"}</button></form><div className="signup_link"><p><FaFingerprint style={{ marginRight: 6, verticalAlign: "-2px" }} />Biometric sign-in is available on supported devices.</p><p style={{ marginTop: 14 }}>New to Chibex? <Link to="/signup">Create an account</Link></p></div></section></main></div>;
};

export default Login;
