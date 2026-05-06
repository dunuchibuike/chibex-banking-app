import React from "react";
import "./css/HeaderStyle.css";
import Button from "./Button";
import { IoMenu } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const navigate = useNavigate();
  return (
    <header className="header_Container">
      <article className="Header_Wrapper">
        <h3>
          Eflex <span>Bank App</span>
        </h3>

        <div className="Header_Wrapper_Right">
          <div className="header_Profile_Holder">
            <div className="Header_Profile">U</div>
            <h5>{user.fullName}</h5>
          </div>
          <button className="Btn Header_Btn" onClick={() => navigate("/")}>{user.fullName !== undefined ? "Log out" : "Login"}</button>

          <div className="Header_Mobile_Toggle" >
            <IoMenu className="Icon" />
          </div>
        </div>
      </article>
    </header>
  );
};

export default Header;
