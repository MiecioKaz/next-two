import Image from "next/image";
import { useLangContext } from "../hooks/useLangContext";

const PetData = ({ detailsSet }) => {
  const { polish, english } = useLangContext();

  return (
    <div className="flex-none">
      <div className="relative block w-72 h-72 mx-auto">
        <Image
          src={detailsSet.petImageUrl}
          alt="pet-image"
          fill
          className="object-cover z-0 border rounded drop-shadow-lg"
        />
      </div>

      <div className="relative group text-center w-72 p-4 mb-10 border-x-2 border-b-2 border-slate-300 bg-white">
        <h2 className="italic text-sm">
          {polish && "Miejsce pobytu:"}
          {english && "Whereabouts:"}
        </h2>
        <p className="text-black">{detailsSet.whereabouts}</p>
        <hr className="m-2 border-black" />
        <h2 className="italic text-sm mt-1.5">
          {polish && "Opis zwierzaka:"}
          {english && "Pet description:"}
        </h2>
        <p className="text-black">{detailsSet.description}</p>
        <hr className="m-2 border-black" />
        {/* </div>
      <div className="relative group text-center"> */}
        <button className="p-1 mt-2 border-2 rounded-2xl bg-teal-300 hover:border-rose-600">
          {polish && "Dane kontaktowe"}
          {english && "Contact details"}
        </button>
        <div className="absolute hidden z-10 w-full left-0 bg-purple-500 group-focus-within:block px-4 text-white">
          <h1 className="my-2">
            {polish && "DANE KONTAKTOWE"}
            {english && "CONTACT DETAILS"}
          </h1>
          <h2>
            {polish && `Imię: ${detailsSet.createdBy.name}`}
            {english && `Name: ${detailsSet.createdBy.name}`}
          </h2>
          <h2 className="my-1">
            {polish && "Adres email:"}
            {english && "Email address:"}
          </h2>
          <p>{detailsSet.createdBy.email}</p>
          <h2 className="my-1">
            {polish && "Numer telefonu:"}
            {english && "Phone number:"}
          </h2>
          <p>{detailsSet.createdBy.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default PetData;
