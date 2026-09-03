import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../lib/HighFunction";

const DashBoardRight = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("Id");
  const [accountData, setAccountData] = useState([]);
  const [theTransactions, setTheTransactions] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(0);

  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [balanceResponse, accountsResponse, userResponse] = await Promise.all([
          axios.get(`${BaseURL}/totalBalance`, authConfig),
          axios.get(`${BaseURL}/allAccounts`, authConfig),
          axios.get(`${BaseURL}/user/${userId}`, authConfig),
        ]);
        const balance = balanceResponse.data?.totalFunds ?? balanceResponse.data?.data?.totalFunds ?? 0;
        const accounts = accountsResponse.data?.data || [];
        const profile = userResponse.data?.data || userResponse.data || {};
        setAccountBalance(balance);
        setAccountData(accounts);
        setTheTransactions(profile.transactions || []);
      } catch (error) {
        console.error("Unable to load dashboard data", error.response?.data || error);
      }
    };

    if (token && userId) loadDashboardData();
  }, [token, userId]);

  useEffect(() => {
    const target = Number(accountBalance) || 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayBalance(target);
      return undefined;
    }
    const start = performance.now();
    const duration = 700;
    let frame;
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayBalance(Math.round(target * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [accountBalance]);

  return (
    <div className="Bank_Form_Wrapper_Right">
      <div className="Bank_Form_Wrapper_Right_Top">
        <article className="Bank_Content_Wrapper_Right_Top">
          <p>Total Available Balance</p>
          <h2 aria-label={`Total balance ${Number(accountBalance).toLocaleString()} naira`}>&#8358; {displayBalance.toLocaleString()}</h2>
          <span>{accountData.length} Account{accountData.length === 1 ? "" : "s"}</span>
        </article>
      </div>
      <div className="Bank_Form_Wrapper_Right_Bottom">
        <p>Transactions History</p>
        
        {theTransactions.length > 0 ? (
          theTransactions?.map((transaction, index) => (
            <div className="Bank_Content_Wrapper_Right_Bottom_Transaction" key={index}>
              <span>{transaction.type === "debit" ? "Debit:" : "Credit:"}</span>
              <span>{transaction.type === "debit" ? "-" : "+"} &#8358; {transaction.amount}</span>
            </div>
          ))
        ) : <span>No transactions yet</span>}
      </div>
    </div>
  );
};

export default DashBoardRight;
