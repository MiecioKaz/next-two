import Link from "next/link";
import { useLangContext } from "../hooks/useLangContext";

const Footer = () => {
  const { polish, english } = useLangContext();

  return (
    <footer className="block md:flex justify-between h-24 md:h-32 px-10 pt-4 text-sm lg:text-base bg-stone-400 text-white">
      {polish && (
        <div>
          <Link
            href="/infoFiles/privacyPol.html"
            className="block hover:underline mb-2"
          >
            Polityka Prywatności
          </Link>
          <Link
            href="/infoFiles/termsPol.html"
            className="block hover:underline"
          >
            Warunki Użytkowania
          </Link>
        </div>
      )}
      {english && (
        <div>
          <Link
            href="/infoFiles/privacyEng.html"
            className="block hover:underline mb-2"
          >
            Privacy Policy
          </Link>
          <Link
            href="/infoFiles/termsEng.html"
            className="block hover:underline"
          >
            Terms & Conditions
          </Link>
        </div>
      )}
      {polish && (
        <div className="hidden md:block">
          <Link
            href="https://www.koty.pl/artykuly/porady/gdy-zaginie-twoj-kot"
            className="block hover:underline"
          >
            Co robić gdy zaginie kot
          </Link>
          <Link
            href="https://kakadu.pl/blog/zaginiecie-psa-co-robic/"
            className="block hover:underline my-2"
          >
            Co robić gdy zaginie pies
          </Link>
          <Link
            href="https://www.telekarma-blog.pl/2022/06/co-zrobic-gdy-nasza-papuga-ucieknie.html#:~:text=Trzeba%20to%20zrobi%C4%87%20ostro%C5%BCnie%2C%20bo,ha%C5%82asu%20ani%20nie%20formujmy%20zbiorowiska."
            className="block hover:underline"
          >
            Co robić gdy ucieknie papuga
          </Link>
        </div>
      )}
      {english && (
        <div className="hidden md:block">
          <Link
            href="https://www.catradar.com/"
            className="block hover:underline"
          >
            Lost cat-What to do.
          </Link>
          <Link
            href="https://www.dogstrust.org.uk/dog-advice/life-with-your-dog/outdoors/lost-your-dog"
            className="block hover:underline my-2"
          >
            Lost dog-What to do.
          </Link>
          <Link
            href="https://www.herebird.com/lost-parrot/"
            className="block hover:underline"
          >
            Lost parrot-What to do.
          </Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;
