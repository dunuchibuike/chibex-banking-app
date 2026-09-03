import React from "react";
import "../page/Dashboard/css/DashboardStyle.css";
import { useEffect, useState } from "react";
import "./css/ButtonStyle.css";
import axios from "axios";
import { BaseURL } from "../lib/HighFunction";

const DashBoardLeft = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("Id");
  const [accountData, setAccountData] = useState([]);
  const [userData, setUserData] = useState({});
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState("");
  const [accountID, setAccountID] = useState("");
  const [pin, setPin] = useState("");
  const [newTransferPin, setNewTransferPin] = useState("");
  const [creatingPin, setCreatingPin] = useState(false);

  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  const getAvailableBalance = async () => {
    try {
      const accountResponse = await axios.get(`${BaseURL}/allAccounts`, authConfig);
      setAccountData(accountResponse.data?.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Unable to load your accounts.");
    }
  };

  useEffect(() => {
    getAvailableBalance();
  }, []);

  const handleGetOneUser = async () => {
    try {
      const userResponse = await axios.get(`${BaseURL}/user/${userId}`, authConfig);
      setUserData(userResponse.data?.data || userResponse.data || {});
    } catch (err) {
      alert(err.response?.data?.message || "Unable to load your profile.");
    }
  };

  useEffect(() => {
    handleGetOneUser();
  }, [userId]);

  const handleSendFunds = async (e) => {
    e.preventDefault();
    if (!accountID || !recipientAccountNumber.trim() || Number(amount) <= 0 || !/^\d{4}$/.test(pin)) {
      alert("Select an account and enter a recipient, valid amount, and 4-digit PIN.");
      return;
    }
    try {
      const response = await axios.put(
        `${BaseURL}/transferFunds/${accountID}`,
        {
          recipientAccountNumber: recipientAccountNumber,
          amount: Number(amount),
          pin: pin,
        },
        authConfig
      );
      alert(response.data?.message || "Funds transferred successfully!");
      setRecipientAccountNumber("");
      setAmount(0);
      setPin("");
      setMemo("");
      await getAvailableBalance();
    } catch (err) {
      alert(err.response?.data?.message || "Transfer failed. Please try again.");
    }
  };

  const handleCreatePin = async (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(newTransferPin)) {
      alert("Your transfer PIN must contain exactly 4 digits.");
      return;
    }

    setCreatingPin(true);
    try {
      const response = await axios.post(
        `${BaseURL}/pin`,
        { pin: newTransferPin },
        authConfig
      );
      alert(response.data?.message || "Transfer PIN created successfully.");
      setNewTransferPin("");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to create transfer PIN.");
    } finally {
      setCreatingPin(false);
    }
  };

  return (
    <div className="Bank_Form_Wrapper_Left">
      <header>
        <h4>Send Funds</h4>
      </header>
      <form onSubmit={handleCreatePin}>
        <div className="Inputs_className_Container">
          <label htmlFor="new-transfer-pin">Create Transfer PIN</label>
          <input
            id="new-transfer-pin"
            type="password"
            inputMode="numeric"
            maxLength={4}
            pattern="[0-9]{4}"
            placeholder="Enter 4-digit PIN"
            value={newTransferPin}
            onChange={(e) => setNewTransferPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" className="Btn Form_Btn" disabled={creatingPin}>
          {creatingPin ? "Creating PIN..." : "Create PIN"}
        </button>
      </form>
      <form onSubmit={handleSendFunds}>

        <div className={"SelectOption_ClassName_Container"}>
          <label>From Account</label>
          <select onChange={(e) => setAccountID(e.target.value)}>
            <option value="">Select Account</option>
            {accountData?.map((item) => (
              <option value={item._id || item.id} key={item._id || item.id}>
                {item.accountType} - {item.accountNumber}
              </option>
            ))}
          </select>
        </div>

        <div className={"Inputs_className_Container"}>
          <label>Recipient Account Number</label>
          <input
            type={"text"}
            placeholder={"Enter Account Number"}
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAccountNumber(e.target.value)}
          />
        </div>

        <div className="Inputs_className_Container">
          <label>Amount</label>
          <input
            type={"text"}
            placeholder={"Amount"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="Inputs_className_Container">
          <label>Full Name</label>
          <input
            type={"text"}
            placeholder={"Full Name"}
            value={userData?.fullName || ""}
            readOnly
          />
        </div>

        <div className="Inputs_className_Container">
          <label>Pin</label>
          <input
            type={"password"}
            placeholder={"Enter your pin"}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <div className="TextArea_ClassName_Container">
          <label>Memo</label>
          <textarea
            placeholder={"Rent, dinner, etc."}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        <button type="submit" className="Btn Form_Btn">Send Fund</button>
      </form>
    </div>
  );
};

export default DashBoardLeft;
