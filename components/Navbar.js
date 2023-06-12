import Image from "next/image";
import Link from "next/link";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLangContext } from "../hooks/useLangContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user } = useAuthContext();
  const { polish, english, dispatch } = useLangContext();
  const { logout, err } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    if (!err) {
      router.push("/");
    }
  };

  return (
    <>
      <nav className="fixed top-0 hidden z-10 w-screen md:flex justify-between items-center h-24 mt-24 bg-slate-100">
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
              height="40"
              viewBox="0 -960 960 960"
              width="40"
              className="ml-8 fill-gray-600 hover:fill-lime-500"
            >
              <path d="M193.029-153.029v-320H61.159L480-849.421l179.696 159.218v-103.435h107.275v201.957l131.87 118.369h-131.87v320.283H567.102V-389.26H392.898v236.231H193.029Zm199.869-401.246h174.204q0-34.551-25.888-57.696-25.889-23.145-61.16-23.145-35.272 0-61.214 23.04t-25.942 57.801Z" />
            </svg>
          </Link>
          {!user && (
            <>
              <Link
                href="/signup"
                className="text-gray-600 hover:text-lime-500"
              >
                {polish && "Zarejestruj"}
                {english && "Signup"}
              </Link>

              <Link
                href="/login"
                className="text-gray-600 hover:text-lime-500"
              >
                {polish && "Zaloguj"}
                {english && "Login"}
              </Link>
            </>
          )}

          {user && (
            <Link
              href={`/show/${user.uid}`}
              className="text-gray-600 hover:text-lime-500"
            >
              {polish && "Zwierzak"}
              {english && "Pet"}
            </Link>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-lime-500"
            >
              {polish && "Wyloguj"}
              {english && "Logout"}
            </button>
          )}
        </div>
        <div className="inline-flex h-1/2">
          <button onClick={() => dispatch({ type: "POLISH" })}>
            <Image
              src="/images/icons8-poland-48.png"
              alt="Poland icon by Icons8"
              className="hover:opacity-50"
              width={48}
              height={48}
            />
          </button>
          <button onClick={() => dispatch({ type: "ENGLISH" })}>
            <Image
              src="/images/icons8-great-britain-48.png"
              alt="Great Britain icon by Icons8"
              className="mx-4 hover:opacity-50"
              width={48}
              height={48}
            />
          </button>
        </div>
      </nav>

      <nav className="fixed top-0 z-10 flex justify-between md:hidden w-screen h-44 bg-slate-100">
        <div className="text-lg ml-10 mt-6">
          <Link
            href="/"
            className="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
              className="fill-gray-600 hover:fill-lime-500"
            >
              <path d="M193.029-153.029v-320H61.159L480-849.421l179.696 159.218v-103.435h107.275v201.957l131.87 118.369h-131.87v320.283H567.102V-389.26H392.898v236.231H193.029Zm199.869-401.246h174.204q0-34.551-25.888-57.696-25.889-23.145-61.16-23.145-35.272 0-61.214 23.04t-25.942 57.801Z" />
            </svg>
            <span className="mt-3 text-gray-600 hover:text-lime-500">Home</span>
          </Link>
          {!user && (
            <>
              <div className="my-3">
                <Link
                  href="/signup"
                  className="text-gray-600 hover:text-lime-500"
                >
                  {polish && "Zarejestruj"}
                  {english && "Signup"}
                </Link>
              </div>

              <div>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-lime-500"
                >
                  {polish && "Zaloguj"}
                  {english && "Login"}
                </Link>
              </div>
            </>
          )}

          {user && (
            <>
              <div className="my-3">
                <Link
                  href={`/show/${user.uid}`}
                  className="text-gray-600 hover:text-lime-500"
                >
                  {polish && "Zwierzak"}
                  {english && "Pet"}
                </Link>
              </div>

              <div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-lime-500"
                >
                  {polish && "Wyloguj"}
                  {english && "Logout"}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="inline-flex h-1/2 mt-20">
          <button onClick={() => dispatch({ type: "POLISH" })}>
            <Image
              src="/images/icons8-poland-48.png"
              alt="Poland icon by Icons8"
              className="hover:opacity-50"
              width={48}
              height={48}
            />
          </button>
          <button onClick={() => dispatch({ type: "ENGLISH" })}>
            <Image
              src="/images/icons8-great-britain-48.png"
              alt="Great Britain icon by Icons8"
              className="mx-4 hover:opacity-50"
              width={48}
              height={48}
            />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
