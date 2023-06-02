import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import Link from "next/link";

const Update = ({ petDoc, userId }) => {
  const [description, setDescription] = useState(petDoc.description);
  const [breed, setBreed] = useState(petDoc.breed);
  const [phoneNumber, setPhoneNumber] = useState(petDoc.createdBy.phoneNumber);
  const [whereabouts, setWhereabouts] = useState(petDoc.whereabouts);
  const [email, setEmail] = useState(petDoc.createdBy.email);
  const [name, setName] = useState(petDoc.createdBy.name);
  const [petImage, setPetImage] = useState(null);
  const [imgError, setImgError] = useState(null);
  const { updateDocument, state } = useFirestore();

  const handleFileChange = (e) => {
    setPetImage(null);
    let selected = e.target.files[0];

    if (
      selected.type !== "image/jpeg" &&
      selected.type !== "image/png" &&
      selected.type !== "image/jpg"
    ) {
      setImgError(
        "Akceptujemy zdjęcia tylko w formacie 'png' 'jpg' lub 'jpeg'"
      );
      return;
    }

    setImgError(null);
    setPetImage(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdBy = {
      name,
      email,
      phoneNumber,
    };

    const petDetails = {
      coll: petDoc.coll,
      breed,
      description,
      whereabouts,
      createdBy,
      docId: petDoc.docId,
    };

    await updateDocument(petDetails, petDoc, userId, petImage);
  };

  return (
    <div className="bg-stone-200 py-6">
      <h1 className="text-center text-xl text-indigo-700 mb-6">
        Dane zwierzaka do edycji
      </h1>

      <form onSubmit={handleSubmit}>
        {petDoc.petImageUrl && (
          <div className="w-5/6 mx-auto">
            <h2>Zdjęcie zwierzaka</h2>
            <label htmlFor="img-select">
              <div className="w-full h-9 px-2 py-1 mb-4 mt-2 bg-white ">
                {petImage ? petImage.name : "Zdjęcie zwierzaka"}
              </div>
            </label>
            <input
              id="img-select"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
            {imgError ? <p className="text-red-500 mb-4">{imgError}</p> : ""}
          </div>
        )}

        <div className="w-5/6 mx-auto">
          <h2>Rasa zwierzaka</h2>
          <select
            className="w-full h-9 p-1 mb-4 mt-2"
            onChange={(e) => setBreed(e.target.value)}
            required
            value={breed}
          >
            <option value="">Wybierz rasę</option>
            <option value="dog">Pies</option>
            <option value="cat">Kot</option>
            <option value="other">Inne</option>
          </select>
        </div>

        <div className="w-5/6 mx-auto">
          <h2>Twoje imię:</h2>
          <input
            className="w-full h-9 p-1 mb-4 mt-2"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="w-5/6 mx-auto">
          <h2>Adres email:</h2>
          <input
            className="w-full h-9 p-1 mb-4 mt-2"
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="w-5/6 mx-auto">
          <h2>Twój numer telefonu</h2>
          <input
            className="w-full h-9 p-1 mb-4 mt-2"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>

        <div className="w-5/6 mx-auto">
          <h2>Opis zwierzaka</h2>
          <textarea
            className="w-full p-1 mb-4 mt-2"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            cols="30"
            rows="5"
          ></textarea>
        </div>

        <div className="w-5/6 mx-auto">
          <h2>Rejon Zaginięcia/Miejsce pobytu</h2>
          <input
            className="w-full h-9 p-1 mb-4 mt-2"
            type="text"
            required
            onChange={(e) => setWhereabouts(e.target.value)}
            value={whereabouts}
          />
        </div>
        <div className="text-center text-lg my-6">
          {!state.success && (
            <button
              type="submit"
              className="w-32 p-1 border-2 rounded-2xl bg-amber-100 hover:border-rose-600"
            >
              {!state.isPending ? "Zmień dane" : "Czekaj"}
            </button>
          )}
        </div>
      </form>

      <div className="text-center">
        {state.success && (
          <>
            <p className="text-red-500 text-lg">
              Pomyślnie zmieniłeś dane zwierzaka.
            </p>
            <Link
              href="/"
              className="text-lg text-fuchsia-700 hover:text-lime-500 mt-10"
            >
              Wróć do strony głównej
            </Link>
          </>
        )}
      </div>

      <div className="text-center">
        {state.error && (
          <p className="text-red-500 text-lg mt-10">{state.error}</p>
        )}
      </div>
    </div>
  );
};

export default Update;
