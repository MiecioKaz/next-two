import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-between h-28 px-10 pt-4 bg-stone-400 text-white">
      <div>
        <Link
          href="/infoFiles/privacyPol.html"
          className="block hover:underline"
        >
          Polityka Prywatności
        </Link>
        <Link
          href="/infoFiles/termsPol.html"
          className="block block hover:underline"
        >
          Warunki Użytkowania
        </Link>
      </div>
      <div>
        <a
          href="https://www.koty.pl/artykuly/porady/gdy-zaginie-twoj-kot"
          className="block block hover:underline"
        >
          Co robić gdy zaginie kot
        </a>
        <a
          href="https://kakadu.pl/blog/zaginiecie-psa-co-robic/"
          className="block block hover:underline"
        >
          Co robić gdy zaginie pies
        </a>
        <a
          href="https://www.telekarma-blog.pl/2022/06/co-zrobic-gdy-nasza-papuga-ucieknie.html#:~:text=Trzeba%20to%20zrobi%C4%87%20ostro%C5%BCnie%2C%20bo,ha%C5%82asu%20ani%20nie%20formujmy%20zbiorowiska."
          className="block block hover:underline"
        >
          Co robić gdy ucieknie papuga
        </a>
      </div>
    </footer>
  );
};

export default Footer;
