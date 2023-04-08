import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <h1>Logowanie użytkownika</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Twój email adres</h2>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <h2>Twoje hasło</h2>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button>Zaloguj</button>
      </form>
      {user && (
        <>
          <Link href={`/show/${user.uid}`}>
            Pokaż szczegóły rejestracji mojego zwierzaka
          </Link>
          <Link href={`/details/${user.uid}`}>Zarejestruj zwierzaka</Link>
        </>
      )}
    </div>
  );
};

export default Login;
