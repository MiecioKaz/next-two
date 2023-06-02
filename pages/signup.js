import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLangContext } from "../hooks/useLangContext";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, error, isPending } = useSignup();
  const { user } = useAuthContext();
  const { polish, english } = useLangContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <div className="w-1/2 mx-auto mt-32 py-10 bg-stone-200">
      {!user && (
        <>
          <h1 className="text-center text-xl mb-8">
            {polish && "Rejestracja Użytkownika"}
            {english && "User Signup"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="w-5/6 mx-auto">
              <h2>
                {polish && "Twój email adres"}
                {english && "Your email address"}
              </h2>
              <input
                className="w-full h-9 p-1 mb-4 mt-2"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="w-5/6 mx-auto">
              <h2>
                {polish && "Twoje hasło"}
                {english && "Your password"}
              </h2>
              <input
                className="w-full h-9 p-1 mb-4 mt-2"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="w-5/6 mx-auto">
              <h2>
                {polish && "Twoje imię"}
                {english && "Your name"}
              </h2>
              <input
                className="w-full h-9 p-1 mt-2"
                type="text"
                required
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
            </div>
            <div className="text-center">
              {polish && (
                <button
                  className="w-32 p-1 mt-8 border-2 rounded-2xl bg-amber-100 hover:border-rose-600"
                  type="submit"
                >
                  {!isPending ? "Zarejestruj" : "Czekaj"}
                </button>
              )}
              {english && (
                <button
                  className="w-32 p-1 mt-8 border-2 rounded-2xl bg-amber-100 hover:border-rose-600"
                  type="submit"
                >
                  {!isPending ? "Sign up" : "Wait"}
                </button>
              )}
            </div>

            {error && (
              <div className="text-center text-xl text-red-600">{error}</div>
            )}
          </form>
        </>
      )}
      {user && (
        <div className="text-center text-xl">
          <h2 className="text-orange-800">
            {polish && `Witaj ${user.displayName}!`}
            {english && `Hello ${user.displayName}`}
          </h2>
          <p className="mt-2 text-orange-800">
            {polish && "Pomyślnie zarejestrowałeś użytkownika"}
            {english && "User signed up successfully"}
          </p>
          <hr className="m-6 border-black" />
          <Link
            href={`/details/${user.uid}`}
            className="text-cyan-600 hover:text-blue-800"
          >
            {polish && "Zarejestruj zwierzaka"}
            {english && "Register pet"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Signup;
