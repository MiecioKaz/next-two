import Image from "next/image";
import Link from "next/link";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  return (
    <nav className="fixed top-0 w-screen flex justify-between items-center h-24 mt-24 bg-slate-200">
      <div className="ml-10 relative text-sm">
        <Image
          src="/images/dog-cat-contour.jpg"
          alt="dog-cat-contour"
          className="border rounded-2xl drop-shadow-lg opacity-70"
          width={110}
          height={120}
        />
        <span className="absolute top-px left-1 text-violet-800">POL</span>
        <span className="absolute bottom-px right-0.5 text-violet-800">
          PETS
        </span>
      </div>

      <div className="flex justify-between items-center text-xl w-5/12 h-3/4">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
            className="fill-gray-600 hover:fill-lime-500"
          >
            <path d="M9.6 40.35V24.4H2.9L24 5.45l9.55 8.4v-5.1h4.85v9.6l6.7 6.05h-6.7v15.95h-9.9V28.8h-9v11.55Zm9.9-19.9h9q0-1.85-1.325-3.05Q25.85 16.2 24 16.2q-1.8 0-3.15 1.2-1.35 1.2-1.35 3.05Z" />
          </svg>
        </Link>
        <Link
          href="/signup"
          className="text-gray-600 hover:text-lime-500"
        >
          Zarejestruj
        </Link>
        <Link
          href="/login"
          className="text-gray-600 hover:text-lime-500"
        >
          Zaloguj
        </Link>
        <Link
          onClick={logout}
          href="/"
          className="text-gray-600 hover:text-lime-500"
        >
          Wyloguj
        </Link>
      </div>
      <div className="inline-flex h-1/2">
        <Image
          src="/images/icons8-poland-48.png"
          alt="Poland icon by Icons8"
          className="hover:opacity-50"
          width={48}
          height={48}
        />
        <Image
          src="/images/icons8-great-britain-48.png"
          alt="Great Britain icon by Icons8"
          className="mx-4 hover:opacity-50"
          width={48}
          height={48}
        />
      </div>
    </nav>
  );
};

export default Navbar;
