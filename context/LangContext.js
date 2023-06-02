import { createContext, useReducer } from "react";

export const LangContext = createContext();

const langReducer = (state, action) => {
  switch (action.type) {
    case "POLISH":
      return { polish: true, english: false };
    case "ENGLISH":
      return { polish: false, english: true };
    default:
      return state;
  }
};

export const LangContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(langReducer, {
    polish: true,
    english: false,
  });

  console.log("LangContext state:", state);

  return (
    <LangContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LangContext.Provider>
  );
};
