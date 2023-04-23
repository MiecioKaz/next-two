import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential) {
          throw new Error("Wystąpił błąd rejestracji użytkownika.");
        }
        const user = userCredential.user;
        updateProfile(user, { displayName }).then(() => {
          dispatch({ type: "LOGIN", payload: user });
          setError(null);
          setIsPending(false);
        });
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });
  };
  console.log(error);

  return { signup, error, isPending };
};
