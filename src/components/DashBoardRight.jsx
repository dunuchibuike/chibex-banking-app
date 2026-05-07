import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useSelector } from "react-redux";

const DashBoardRight = () => {
  const {fromAccount, user} = useContext(AuthContext);
  const users = useSelector(state => state.users);
  const [theAccountInfo, setTheAccountInfo] = useState(null);
  const [theTransactions, setTheTransactions] = useState([]);
  

  useEffect(() => {
    const accountInfo = users.find(e => e.id === user?.id) || null;
    const transactions = accountInfo?.transactions || [];
    const account = accountInfo?.accounts?.find(account => account.id === fromAccount?.id);
    console.log("dashboard right",user);
    setTheAccountInfo(account);
    setTheTransactions(transactions);
  }, [fromAccount, users, user]);
  
  
  return (
    <div className="Bank_Form_Wrapper_Right">
      <div className="Bank_Form_Wrapper_Right_Top">
        <article className="Bank_Content_Wrapper_Right_Top">
          <p>Total Available Balance</p>
          <h2 contentEditable="true">&#8358; {theAccountInfo?.balance}</h2>
          <span>Across 2 Accounts</span>
        </article>
      </div>
      <div className="Bank_Form_Wrapper_Right_Bottom">
        <p>Transactions History</p>
        
        {
          theTransactions?.map((transaction, index) => (
            <div className="Bank_Content_Wrapper_Right_Bottom_Transaction" key={index}>
              <span>{transaction.type === "debit" ? "Debit:" : "Credit:"}</span>
              <span>{transaction.type === "debit" ? "-" : "+"} &#8358; {transaction.amount}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DashBoardRight;
