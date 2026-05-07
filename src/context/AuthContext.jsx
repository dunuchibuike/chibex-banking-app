import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";  
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  // const users = useSelector(state => state.users);
  const [user, setUser] = useState(null);
  // const accounts = user?.accounts.map(account => account);
  const [fromAccount, setFromAccount] = useState(null);

  useEffect(() => {
    console.log("context",user);
  }, [user]);
 
  return <AuthContext.Provider value={{ user, setUser, setFromAccount, fromAccount }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
