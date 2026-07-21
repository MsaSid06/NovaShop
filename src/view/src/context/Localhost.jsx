import { createContext } from "react";
// import { useState } from "react";

const LocalContext = createContext();
export const LocalProvider = ({ children }) => {
  // const localhost = "192.168.1.46";
  const localhost = "localhost";
  return (
    <LocalContext.Provider value={{ localhost }}>
      {children}
    </LocalContext.Provider>
  );
};

export default LocalContext;
