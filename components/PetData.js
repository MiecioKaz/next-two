import Image from "next/image";

const PetData = ({ detailsSet }) => {
  return (
    <div className="">
      <div className="relative block w-72 h-72 mx-auto">
        <Image
          src={detailsSet.petImageUrl}
          alt="pet-image"
          fill
          className="object-cover border rounded drop-shadow-lg"
        />
      </div>

      <div className=" mx-auto w-72 p-4 border-x-2 border-b-2 border-slate-300 bg-white">
        <h2 className="italic text-sm">Miejsce pobytu:</h2>
        <p className="text-black">{detailsSet.whereabouts}</p>
        <h2 className="italic text-sm mt-1.5">Opis zwierzaka:</h2>
        <p className="text-black">{detailsSet.description}</p>
      </div>
      <div className="relative group text-center">
        <button className="p-1 mt-2 border-2 rounded-2xl bg-amber-100 focus:border-rose-600">
          Dane kontaktowe
        </button>
        <div className="absolute -top-52 left-10 hidden bg-slate-600 group-focus-within:block px-4 text-white">
          <h1>Dane kontaktowe</h1>
          <h2>Imię: {detailsSet.createdBy.name}</h2>
          <h2>Adres email:</h2>
          <p>{detailsSet.createdBy.email}</p>
          <h2>Numer telefonu:</h2>
          <p>{detailsSet.createdBy.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default PetData;
