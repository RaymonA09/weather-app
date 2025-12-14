import { createContext, useContext, useState } from "react";

const UnitsContext = createContext();

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState({
    temperature: "celsius", // "celsius" | "fahrenheit"
    wind: "kmh",            // "kmh" | "mph"
    precipitation: "mm",    // "mm" | "in"
  });

    function updateUnit(type, value) {
    setUnits(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  function setMetric(){
    setUnits({
      system: "metric",
      temperature: "celsius",
      wind: "kmh",
      precipitation: "mm",
    });
  };

  function setImperial(){
    setUnits({
      system: "imperial",
      temperature: "fahrenheit",
      wind: "mph",
      precipitation: "in",
    })
  };

  return (
    <UnitsContext.Provider value={{ units, updateUnit, setMetric, setImperial }}>
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
