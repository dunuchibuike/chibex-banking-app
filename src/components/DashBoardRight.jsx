import React from "react";

const DashBoardRight = () => {
  return (
    <div className="Bank_Form_Wrapper_Right">
      <div className="Bank_Form_Wrapper_Right_Top">
        <article className="Bank_Content_Wrapper_Right_Top">
          <p>Total Available Balance</p>
          <h2 contentEditable="true">&#8358; 50,000.00</h2>
          <span>Across 2 Accounts</span>
        </article>
      </div>
      <div className="Bank_Form_Wrapper_Right_Bottom">
        <p>Transactions History</p>
        <div className="Bank_Content_Wrapper_Right_Bottom_Transaction">
          <span>Debit:</span>
          <span>- &#8358; 5,000.00</span>
        </div>
        <div className="Bank_Content_Wrapper_Right_Bottom_Transaction">
          <span>Credit:</span>
          <span>+ &#8358; 10,000.00</span>
        </div>
      </div>
    </div>
  );
};

export default DashBoardRight;
