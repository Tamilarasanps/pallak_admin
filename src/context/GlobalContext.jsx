import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const GlobalContext = createContext();

// 2. Create the provider component
export const GlobalProvider = ({ children }) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);

  return (
    <GlobalContext.Provider value={{ vehicleDetails, setVehicleDetails }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 3. Create a custom hook for easy usage
export const useGlobalContext = () => useContext(GlobalContext);
