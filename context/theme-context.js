import React, { createContext, useState } from "react";

const ThemeContext = createContext({});

export default ThemeContext;

export const themes = {
  default: {
    name: "default",
    className: "",
  },
  dark: {
    name: "dark",
    className: "table-dark",
  },
  primary: {
    name: "primary",
    className: "table-primary",
  },
  warning: {
    name: "warning",
    className: "table-warning",
  },
};

export const ThemeContextProvider = ({children})=>{
  const [theme, setTheme] = useState(themes.default);
  return <ThemeContext.Provider value={{theme, setTheme}}>
    {children}
  </ThemeContext.Provider>
}