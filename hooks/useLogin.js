import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch({ type: "LOGIN", payload: user });
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });
  };
  console.log(error);

  return { login, error, isPending };
};
