import { createContext } from "react";
// import { useState } from "react";

const LocalContext = createContext();
export const LocalProvider = ({ children }) => {
  // const localhost = " 192.168.1.207";
  // const localhost = "192.168.56.1";
  // const localhost = "192.168.1.10";
  const localhost = "192.168.1.14";
  // const localhost = "192.168.1.10";
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
