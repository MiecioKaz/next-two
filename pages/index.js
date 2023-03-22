import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-gray-600 my-14 italic">
        Zwierzęta domowe Polaków w UK
      </h1>
      <div className="flex justify-between items-center w-11/12 h-40 border rounded-lg drop-shadow-lg mt-10 mx-auto p-10 bg-orange-50">
        <h2 className="inline-block w-1/2 text-3xl text-gray-600">
          Zaginął twój zwierzak i chcesz go odnależć
        </h2>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          className="fill-blue-700"
        >
          <path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z" />
        </svg>

        <div className="relative group inline-block w-1/4">
          <h2 className="text-gray-600 hover:text-teal-300">
            Pokaż listę zarejestrowanych, przygarniętych zwierzaków
          </h2>
          <ul className="absolute top-0 -left-16 hidden group-hover:block">
            <li>
              <Link
                href="/petList/found/dog"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Psy
              </Link>
            </li>
            <li>
              <Link
                href="/petList/found/cat"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Koty
              </Link>
            </li>
            <li>
              <Link
                href="/petList/found/other"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Inne
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center w-11/12 h-40 border rounded-lg drop-shadow-lg mt-10 mx-auto p-10 bg-lime-50">
        <h2 className="inline-block w-1/2 text-3xl text-gray-600">
          Przygarnąłeś zabłąkanego zwierzaka i chcesz pomóc mu wrócić do domu
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          className="fill-blue-700"
        >
          <path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z" />
        </svg>

        <div className="relative group inline-block w-1/4">
          <h2 className="text-gray-600 hover:text-teal-300">
            Pokaż listę osób poszukujących swoich zwierząt
          </h2>
          <ul className="absolute top-0 -left-16 hidden group-hover:block">
            <li>
              <Link
                href="/petList/lost/dog"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Psy
              </Link>
            </li>
            <li>
              <Link
                href="/petList/lost/cat"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Koty
              </Link>
            </li>
            <li>
              <Link
                href="/petList/lost/other"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Inne
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center w-11/12 h-40 border rounded-lg drop-shadow-lg mt-10 mx-auto p-10 bg-cyan-50">
        <h2 className="inline-block w-1/2 text-3xl text-gray-600">
          Szukasz nowego domu dla swojego zwierzaka
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          className="fill-blue-700"
        >
          <path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z" />
        </svg>

        <div className="relative group inline-block w-1/4">
          <h2 className="text-gray-600 hover:text-teal-300">
            Pokaż listę potencjalnych nowych właścicieli
          </h2>
          <ul className="absolute top-0 -left-16 hidden group-hover:block">
            <li>
              <Link
                href="/petList/newHome/dog"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Psy
              </Link>
            </li>
            <li>
              <Link
                href="/petList/newHome/cat"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Koty
              </Link>
            </li>
            <li>
              <Link
                href="/petList/newHome/other"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Inne
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center w-11/12 h-40 border rounded-lg drop-shadow-lg mt-10 mx-auto p-10 bg-violet-50">
        <h2 className="inline-block w-1/2 text-3xl text-gray-600">
          Szukasz zwierzaka do zamieszkania w twoim domu
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          className="fill-blue-700"
        >
          <path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z" />
        </svg>

        <div className="relative group inline-block w-1/4">
          <h2 className="text-gray-600 hover:text-teal-300">
            Pokaż listę czekających na zmianę domu zwierzaków
          </h2>
          <ul className="absolute top-0 -left-16 hidden group-hover:block">
            <li>
              <Link
                href="/petList/relocate/dog"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Psy
              </Link>
            </li>
            <li>
              <Link
                href="/petList/relocate/cat"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Koty
              </Link>
            </li>
            <li>
              <Link
                href="/petList/relocate/other"
                className="block px-4 py-2 text-gray-600 hover:text-teal-300 bg-gray-200"
              >
                Inne
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
