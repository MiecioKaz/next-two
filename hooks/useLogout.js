import { useState } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = () => {
    setError(false);
    setIsPending(true);

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: "LOGOUT" });
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });
  };

  const userDelete = () => {
    setError(false);
    setIsPending(true);

    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });
  };

  return { logout, userDelete, error, isPending };
};
