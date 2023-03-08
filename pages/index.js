import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-gray-600 mt-10 italic">
        Zwierzęta domowe w polskich domach w UK
      </h1>
      <div className="flex justify-between items-center w-10/12 m-auto">
        <h2 className="inline-block text-3xl">
          Zaginął zwierzak i chcesz go odnależć
        </h2>
        <Image
          src="/images/arrow_forward_ios.png"
          alt="arrow-icon"
          className="object-contain"
          width={80}
          height={80}
        />

        <Link href="/petLists/stray">
          <div className="w-52 h-22 bg-gray-600 text-xs">
            Wyświetl listę przygarniętych, zagubionych zwierzaków
          </div>
        </Link>
      </div>

      <Image
        src="/images/dog-contour2.jpg"
        alt="dog-contour"
        className="border rounded-3xl"
        width={80}
        height={100}
      />

      <Image
        src="/images/dog-contour4.jpg"
        alt="dog-contour"
        width={200}
        height={200}
      />
      <Image
        src="/images/dog-men-contour.jpg"
        alt="dog-contour"
        width={200}
        height={200}
      />
    </div>
  );
}
