import React, { useEffect, useState } from "react";
import "./css/HeaderStyle.css";
import Button from "./Button";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL, getUserProfile } from "../lib/HighFunction.jsx";

const Header = () => {
  // console.log(user);
  const navigate = useNavigate();

  const userId = localStorage.getItem("Id");
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({});

  const handleGetUser = async() => {
    try {
      const userRes = await axios.get(`${BaseURL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(userRes?.data?.data || userRes?.data || {});
    } catch (error) {
      console.error("Unable to load user", error.response?.data || error);
    }
  }

  useEffect(() => {
    handleGetUser();
  }, [userId, token]);


  return (
    <header className="header_Container">
      <article className="Header_Wrapper">
        <h3>
          Chibex <span>Bank App</span>
        </h3>

        <div className="Header_Wrapper_Right">
          <div className="header_Profile_Holder">
            <div className="Header_Profile">
              {getUserProfile(userData?.fullName)}
            </div>
            <h5>{userData?.fullName}</h5>
          </div>
          <button className="Btn Header_Btn" onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("Id");
            navigate("/");
          }}>Log out</button>

          <div className="Header_Mobile_Toggle" >
            <IoMenu className="Icon" />
          </div>
        </div>
      </article>
    </header>
  );
};

export default Header;
