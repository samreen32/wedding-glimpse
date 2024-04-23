import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
const [value, setValue] = useState();


  return (
    <AuthContext.Provider
      value={{
        value, 
        setValue
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserLogin = () => useContext(AuthContext);

export default AuthProvider;
