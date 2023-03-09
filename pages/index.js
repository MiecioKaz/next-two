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

        <Link
          href="/petLists/strayPet"
          className="w-1/4 text-gray-600 hover:text-teal-300"
        >
          Wyświetl listę zarejestrowanych, przygarniętych zwierzaków
        </Link>
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

        <Link
          href="/petLists/lostPet"
          className="w-1/4 text-gray-600 hover:text-teal-300"
        >
          Wyświetl listę osób poszukujących swoich zwierząt
        </Link>
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

        <Link
          href="/petLists/newPet"
          className="w-1/4 text-gray-600 hover:text-teal-300"
        >
          Wyświetl listę potencjalnych nowych właścicieli
        </Link>
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

        <Link
          href="/petLists/newHome"
          className="w-1/4 text-gray-600 hover:text-teal-300"
        >
          Wyświetl listę czekających na zmianę domu zwierzaków
        </Link>
      </div>
    </div>
  );
}
