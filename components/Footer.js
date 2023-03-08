import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-32 bg-stone-300">
      <Link href="/">Polityka Prywatności</Link>
      <Link href="/">Warunki Użytkowania</Link>
      <Link href="/">Co robić gdy zwierzak zaginie</Link>
    </footer>
  );
};

export default Footer;
