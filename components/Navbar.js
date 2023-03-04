import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-screen flex justify-between items-center h-24 bg-slate-200">
      <Image
        src="/images/icons8-pets-96.png"
        alt="Pets icon by Icons8"
        className="ml-4"
        width={90}
        height={90}
      />

      <div className="flex justify-between items-center text-xl w-5/12 h-3/4">
        <Link
          href="/"
          className="text-gray-600 hover:text-lime-500"
        >
          Home
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
      </div>
      <div className="flex h-1/2">
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
