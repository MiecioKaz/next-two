import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLangContext } from "../hooks/useLangContext";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();
  const { userDelete, isPend, err } = useLogout();
  const { user } = useAuthContext();
  const { polish, english } = useLangContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleDeleteUser = async () => {
    userDelete();

    if (!err) {
      router.push("/");
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-32 py-10 bg-stone-200">
      {!user && (
        <>
          <h1 className="text-center text-xl mb-8">
            {polish && "Logowanie użytkownika"}
            {english && "User Login"}
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
            <div className="text-center">
              {polish && (
                <button
                  className="w-32 p-1 mt-8 border-2 rounded-2xl bg-amber-100 hover:border-rose-600"
                  type="submit"
                >
                  {!isPending ? "Zaloguj" : "Czekaj..."}
                </button>
              )}
              {english && (
                <button
                  className="w-32 p-1 mt-8 border-2 rounded-2xl bg-amber-100 hover:border-rose-600"
                  type="submit"
                >
                  {!isPending ? "Login" : "Wait..."}
                </button>
              )}
            </div>
            {error && (
              <div className="text-center text-xl text-red-600 mt-6">
                {error}
              </div>
            )}
          </form>
        </>
      )}

      {user && (
        <div className="text-center text-xl">
          <h2 className="text-orange-800">
            {polish && `Witaj ${user.displayName}!`}
            {english && `Hello ${user.displayName}!`}
          </h2>
          <p className="mt-2  text-orange-800">
            {polish && "Jesteś zalogowany do systemu"}
            {english && "You logged in successfully"}
          </p>
          <hr className="m-6 border-black" />
          <Link
            href={`/show/${user.uid}`}
            className="inline-block mb-6 text-cyan-600 hover:text-blue-800"
          >
            {polish && "Pokaż szczegóły rejestracji mojego zwierzaka"}
            {english && "Show my pet's details"}
          </Link>
          <Link
            href={`/details/${user.uid}`}
            className="inline-block text-cyan-600 hover:text-blue-800"
          >
            {polish && "Zarejestruj zwierzaka"}
            {english && "Register pet"}
          </Link>

          <div>
            <button
              onClick={handleDeleteUser}
              className="text-cyan-600 hover:text-blue-800 mt-4"
            >
              {!isPend ? "Usuń konto użytkownika" : "Czekaj"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
