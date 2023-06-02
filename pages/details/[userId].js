import { useRouter } from "next/router";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { userId } = context.params;

  const docSnap = await getDoc(doc(db, "pets", userId));

  const isDocument = docSnap.exists();

  return {
    props: { isDocument },
  };
}

const Details = ({ isDocument }) => {
  const [optionSet, setOptionSet] = useState("");
  const [description, setDescription] = useState("");
  const [whereabouts, setWhereabouts] = useState("");
  const [breed, setBreed] = useState("");
  const [petImage, setPetImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formError, setFormError] = useState(null);
  const [imgError, setImgError] = useState(null);
  const { addDocument, state } = useFirestore();
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuthContext();

  console.log(isDocument);

  const handleFileChange = (e) => {
    setPetImage(null);
    let selected = e.target.files[0];
    console.log(selected.name);

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
    setFormError(null);

    if (!user) {
      setFormError(
        "Przed rejestacją zwierzaka wymagane zalogowanie do systemu"
      );
      return;
    }

    const createdBy = {
      name: user.displayName,
      email: user.email,
      phoneNumber,
    };

    const petDetails = {
      coll: optionSet,
      breed,
      description,
      whereabouts,
      createdBy,
      docId: userId,
    };

    await addDocument(petDetails, petImage, userId);
  };

  if (!isDocument) {
    return (
      <div className="w-1/2 mx-auto mt-32 py-10 bg-stone-200">
        <h1 className="text-center text-xl mb-8">Rejestracja zwierzaka</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-5/6 mx-auto">
            <h2>Powód rejestracji</h2>
            <select
              className="w-full h-9 p-1 mb-4 mt-2"
              onChange={(e) => setOptionSet(e.target.value)}
              required
              value={optionSet}
            >
              <option value="">Wybierz opcję</option>
              <option value="lost">Zaginięcie</option>
              <option value="found">Przygarnięcie</option>
              <option value="relocate">Do oddania</option>
              <option value="newHome">Do przyjęcia</option>
            </select>
          </div>
          {optionSet !== "newHome" && (
            <div className="w-5/6 mx-auto">
              <h2>Zdjęcie zwierzaka</h2>
              <label htmlFor="img-select">
                <div className="w-full h-9 p-2 mb-4 mt-2 bg-white ">
                  {petImage ? petImage.name : "Zdjęcie zwierzaka"}
                </div>
              </label>
              <input
                id="img-select"
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />
              {imgError ? <p>{imgError}</p> : ""}
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
          <div className="w-5/6 mx-auto">
            <h2>Twój numer telefonu</h2>
            <input
              className="w-full h-9 p-1 mb-4 mt-2"
              type="text"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          <div className="text-center">
            {!state.isPending && !state.success && (
              <button
                type="submit"
                className="w-40 p-1 mt-8 border-2 rounded-2xl bg-amber-100 hover:border-rose-600"
              >
                Zapisz Dane
              </button>
            )}
            {state.isPending && !state.success && (
              <button
                className="w-32 p-1 mt-8 border-2 rounded-2xl bg-amber-100"
                disabled
              >
                loading
              </button>
            )}
          </div>

          {formError && (
            <div className="w-5/6 mx-auto text-center mt-12 text-xl text-red-600">
              {formError}
            </div>
          )}
        </form>
        {state.error && (
          <div className="w-5/6 mx-auto text-center mt-12 text-xl text-red-600">
            {state.error}
          </div>
        )}

        <div className="text-center text-xl mt-10">
          {state.success && (
            <Link
              href={`/show/${userId}`}
              className="text-cyan-600 hover:text-blue-800"
            >
              Pokaż szczegóły rejestracji mojego zwierzaka
            </Link>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-1/2 mx-auto text-center mt-32 text-xl text-red-600">
        Z jednego konta użytkownika można zarejestrować tylko jednego zwierzaka.
      </div>
    );
  }
};

export default Details;
