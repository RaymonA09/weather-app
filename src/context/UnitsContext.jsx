import { createContext, useContext, useState } from "react";

const UnitsContext = createContext();

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState({
    temperature: "celsius", // "celsius" | "fahrenheit"
    wind: "kmh",            // "kmh" | "mph"
    precipitation: "mm",    // "mm" | "in"
  });

  // update a single unit category
  const updateUnit = (category, value) => {
    setUnits(prev => ({ ...prev, [category]: value }));
  };

  return (
    <UnitsContext.Provider value={{ units, updateUnit }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
}
