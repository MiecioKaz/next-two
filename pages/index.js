import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl text-gray-600 mt-10">
        Zwierzęta domowe w polskich domach w UK
      </h1>
      <div className="relative w-5/6 h-5/6 overflow-hidden">
        <Image
          src="/images/dog-contour.jpg"
          alt="dog-contour"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
