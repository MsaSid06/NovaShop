import { createContext } from "react";
// import { useState } from "react";

const LocalContext = createContext();
export const LocalProvider = ({ children }) => {
  // const localhost = "192.168.1.11";
  // const localhost = "192.168.56.1";
  const localhost = "192.168.1.86";
  // const localhost = "192.168.1.129";
  // const localhost = "localhost";
  // const localhost = "xxxx.ngrok-free.dev";
  return (
    <LocalContext.Provider value={{ localhost }}>
      {children}
    </LocalContext.Provider>
  );
};

export default LocalContext;
