import { useContext } from "react";
import { LangContext } from "../context/LangContext";

export const useLangContext = () => {
  const context = useContext(LangContext);

  if (!context) {
    throw Error("useLangContext must be used inside an LangContextProvider");
  }

  return context;
};
