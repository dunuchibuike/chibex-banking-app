import React from "react";
import "./css/HeaderStyle.css";
import Button from "./Button";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <header className="header_Container">
      <article className="Header_Wrapper">
        <h3>
          Eflex <span>Bank App</span>
        </h3>

        <div className="Header_Wrapper_Right">
          <div className="header_Profile_Holder">
            <div className="Header_Profile">U</div>
            <h5>UserName</h5>
          </div>
          <Button text={"Log out"} className={"Header_Btn"} />

          <div className="Header_Mobile_Toggle">
            <IoMenu className="Icon" />
          </div>
        </div>
      </article>
    </header>
  );
};

export default Header;
