import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, error, isPending } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <div>
      <h1>Rejestracja użytkownika</h1>
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
        <div>
          <h2>Twoje imię</h2>
          <input
            type="text"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </div>

        <button type="submit">Zarejestruj</button>
      </form>
      {user && <Link href={`/details/${user.uid}`}>Zarejestruj zwierzaka</Link>}
    </div>
  );
};

export default Signup;
