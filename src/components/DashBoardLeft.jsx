import React from "react";
import SelectOption from "./SelectOption";
import Inputs from "./Inputs";
import TextArea from "./TextArea";
import "../page/Dashboard/css/DashboardStyle.css";
import Button from "./Button";

const DashBoardLeft = () => {
  const data = ["a", "a", "a", "a", "a"];
  return (
    <div className="Bank_Form_Wrapper_Left">
      <header>
        <h4>Send Funds</h4>
      </header>
      <form>
        <SelectOption
          label={"From Accout"}
          optionData={data}
          className={"SelectOption_ClassName_Container"}
        />
        <Inputs
          type={"text"}
          label={"Recipient full name"}
          className={"Inputs_className_Container"}
          placeholder={"E.g.., Jane Smith"}
        />
        <Inputs
          type={"text"}
          label={"Recipient Account Number"}
          className={"Inputs_className_Container"}
          placeholder={"E.g.., 987654321"}
        />
        <Inputs
          type={"text"}
          label={"Amount"}
          className={"Inputs_className_Container"}
          placeholder={"# 0.00"}
        />
        <TextArea
          className={"TextArea_ClassName_Container"}
          placeholder={"Rent, dinner, etc."}
          label={"Memo"}
        />

        <Button text={"Send Fund"} className={"Form_Btn"} />
      </form>
    </div>
  );
};

export default DashBoardLeft;
