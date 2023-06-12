import Link from "next/link";
import { Exo, Cinzel } from "next/font/google";
import { useLangContext } from "../hooks/useLangContext";

const exo = Exo({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-exo",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-cinzel",
});

export default function Home() {
  const { polish, english } = useLangContext();

  return (
    <>
      <div className="w-11/12 md:w-10/12 lg:w-1/2 mx-auto p-12 text-center">
        <h1
          className={`${exo.variable} font-sans mb-4 text-3xl md:text-4xl text-gray-600`}
        >
          POL-PETS
        </h1>
        <p className={`${cinzel.variable} font-serif text-gray-600`}>
          {polish &&
            "Platforma kontaktowa dla właścicieli zwierząt domowych, skierowana głównie do polskiej społeczności w UK."}
          {english &&
            "Communication platform for pet owners, aimed primarily to polish community in UK."}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 w-11/12 mx-auto mb-10 text-center text-gray-600">
        <div className="flex flex-col justify-between border-2 rounded-lg shadow-md p-6 h-52 lg:h-60 bg-white">
          <h2 className="text-lg text-violet-900">
            {polish && "Zaginął twój zwierzak i chcesz go odnależć"}
            {english && "Your pet has been lost and you want to find it"}
          </h2>
          <hr className="m-6 border-black" />
          <div className="relative group w-3/4 md:w-1/2 mx-auto text-xs md:text-sm hover:bg-sky-100">
            {polish && "Pokaż listę znalezionych i przygarniętych zwierzaków"}
            {english && "Show the list of found and taken in pets"}
            <div className="absolute hidden group-hover:block w-full border-2 bg-slate-100">
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Psy"}
                {english && "Dogs"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Koty"}
                {english && "Cats"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Inne"}
                {english && "Other"}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between border-2 rounded-lg shadow-md p-4 h-52 lg:h-60 bg-white">
          <h2 className="text-lg text-violet-900">
            {polish &&
              "Przygarnąłeś zabłąkanego zwierzaka i chcesz pomóc mu wrócić do domu"}
            {english &&
              "You found and took in a stray pet and you want to find its owner"}
          </h2>
          <hr className="m-6 border-black" />
          <div className="relative group w-3/4 md:w-1/2 mx-auto text-xs md:text-sm hover:bg-sky-100">
            {polish && "Pokaż listę osób poszukujących swoich zwierząt"}
            {english && "Show the list of looking for their pets people"}
            <div className="absolute hidden group-hover:block w-full border-2 bg-slate-100">
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Psy"}
                {english && "Dogs"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Koty"}
                {english && "Cats"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Inne"}
                {english && "Other"}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between border-2 rounded-lg shadow-md p-4 h-52 lg:h-60 bg-white">
          <h2 className="text-lg text-violet-900">
            {polish && "Szukasz nowego domu dla swojego zwierzaka"}
            {english && "You are looking for new home for your pet"}
          </h2>
          <hr className="m-6 border-black" />
          <div className="relative group w-3/4 md:w-1/2 mx-auto text-xs md:text-sm hover:bg-sky-100">
            {polish && "Pokaż listę potencjalnych nowych właścicieli"}
            {english && "Show the list of potential new owners"}
            <div className="absolute hidden group-hover:block w-full border-2 bg-slate-100">
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Psy"}
                {english && "Dogs"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Koty"}
                {english && "Cats"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Inne"}
                {english && "Other"}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between border-2 rounded-lg shadow-md p-4 h-52 lg:h-60 bg-white">
          <h2 className="text-lg text-violet-900">
            {polish && "Szukasz zwierzaka do zamieszkania w twoim domu"}
            {english && "You are looking for a pet in need of adoption"}
          </h2>
          <hr className="m-6 border-black" />
          <div className="relative group w-3/4 md:w-1/2 mx-auto text-xs md:text-sm hover:bg-sky-100">
            {polish && "Pokaż listę czekających na zmianę domu zwierzaków"}
            {english && "Show the list of pets ready to be rehomed"}
            <div className="absolute hidden group-hover:block w-full border-2 bg-slate-100">
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Psy"}
                {english && "Dogs"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Koty"}
                {english && "Cats"}
              </Link>
              <Link
                href="/petList/lost/dog"
                className="block h-10 pt-2 hover:bg-sky-600 hover:text-white"
              >
                {polish && "Inne"}
                {english && "Other"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
