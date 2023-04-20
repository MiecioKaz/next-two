import Image from "next/image";

const Display = ({ details }) => {
  return (
    <div>
      <h1>Wykaz danych zarejestrowanego zwierzaka po edycji</h1>
      <div className="relative block w-72 h-72">
        <Image
          src={details.petImageUrl}
          alt="pet-image"
          fill
          className="object-cover border rounded drop-shadow-lg"
        />
      </div>
      <h2>Rasa: {details.breed}</h2>
      <h2>Opis zwierzaka:</h2>
      <p>{details.description}</p>
      <h2>Miejsce pobytu: {details.whereabouts}</h2>
      <h1>Dane kontaktowe:</h1>
      <h2>Imię: {details.createdBy.name}</h2>
      <h2>Adres email: {details.createdBy.email}</h2>
      <h2>Numer telefonu: {details.createdBy.phoneNumber}</h2>
    </div>
  );
};

export default Display;
