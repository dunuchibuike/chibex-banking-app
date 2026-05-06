import { createContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState(null);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
