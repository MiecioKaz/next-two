import { useState } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [err, setErr] = useState(null);
  const [isPend, setIsPend] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = () => {
    setErr(false);
    setIsPend(true);

    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        setErr(null);
        setIsPend(false);
      })
      .catch((error) => {
        setErr(error.message);
        setIsPend(false);
      });
  };

  const userDelete = () => {
    setErr(false);
    setIsPend(true);

    deleteUser(user)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        setErr(null);
        setIsPend(false);
      })
      .catch((error) => {
        setErr(error.message);
        setIsPend(false);
      });
  };

  return { logout, userDelete, err, isPend };
};
