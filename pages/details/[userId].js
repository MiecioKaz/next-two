import { useRouter } from "next/router";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Link from "next/link";
import { useLangContext } from "../../hooks/useLangContext";

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
  const { polish, english } = useLangContext();

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

    const createdAt = new Date().toDateString();

    const createdBy = {
      name: user.displayName,
      email: user.email,
      phoneNumber,
    };

    const petDetails = {
      createdAt,
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
      <div className="w-3/4 md:w-1/2 mx-auto mt-32 mb-10 py-10 bg-stone-200">
        <h1 className="text-center text-lg md:text-xl mb-8">
          {polish && "Rejestracja zwierzaka"}
          {english && "Pet registration"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-5/6 mx-auto">
            <h2>
              {polish && "Powód rejestracji"}
              {english && "Reason of registration"}
            </h2>
            <select
              className="w-full h-9 p-1 mb-4 mt-2"
              onChange={(e) => setOptionSet(e.target.value)}
              required
              value={optionSet}
            >
              <option value="">
                {polish && "Wybierz opcję"}
                {english && "Choose option"}
              </option>
              <option value="lost">
                {polish && "Zaginięcie zwierzaka"}
                {english && "Searching lost pet"}
              </option>
              <option value="found">
                {polish && "Przygarnięcie zwierzaka"}
                {english && "Found & taken in pet"}
              </option>
              <option value="relocate">
                {polish && "Zwierzak do adopcji"}
                {english && "Awaiting adoption pet"}
              </option>
              <option value="newHome">
                {polish && "Gotowy do adopcji zwierzaka"}
                {english && "Ready to adopt pet"}
              </option>
            </select>
          </div>
          {optionSet !== "newHome" && (
            <div className="w-5/6 mx-auto">
              <h2>
                {polish && "Zdjęcie zwierzaka"}
                {english && "Pets picture"}
              </h2>
              <label htmlFor="img-select">
                {polish && (
                  <div className="w-full h-9 p-2 mb-4 mt-2 bg-white ">
                    {petImage ? petImage.name : "Zdjęcie zwierzaka"}
                  </div>
                )}
                {english && (
                  <div className="w-full h-9 p-2 mb-4 mt-2 bg-white ">
                    {petImage ? petImage.name : "Pets picture"}
                  </div>
                )}
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
            <h2>
              {polish && "Rasa zwierzaka"}
              {english && "Pets breed"}
            </h2>
            <select
              className="w-full h-9 p-1 mb-4 mt-2"
              onChange={(e) => setBreed(e.target.value)}
              required
              value={breed}
            >
              <option value="">
                {polish && "Wybierz rasę zwierzaka"}
                {english && "Choose pets breed"}
              </option>
              <option value="dog">
                {polish && "Pies"}
                {english && "Dog"}
              </option>
              <option value="cat">
                {polish && "Kot"}
                {english && "Cat"}
              </option>
              <option value="other">
                {polish && "Inne"}
                {english && "Other"}
              </option>
            </select>
          </div>
          <div className="w-5/6 mx-auto">
            <h2>
              {polish && "Opis zwierzaka"}
              {english && "Pets description"}
            </h2>
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
            <h2>
              {polish && "Rejon Zaginięcia/Miejsce pobytu"}
              {english && "Whereabouts"}
            </h2>
            <input
              className="w-full h-9 p-1 mb-4 mt-2"
              type="text"
              required
              onChange={(e) => setWhereabouts(e.target.value)}
              value={whereabouts}
            />
          </div>
          <div className="w-5/6 mx-auto">
            <h2>
              {polish && "Twój numer telefonu"}
              {english && "Your phone number"}
            </h2>
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
                {polish && "Zapisz Dane"}
                {english && "Save details"}
              </button>
            )}
            {state.isPending && !state.success && (
              <button
                className="p-1 mt-8 border-2 rounded-2xl bg-amber-100"
                disabled
              >
                {polish && "Zapisywanie..."}
                {english && "Loading..."}
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
              className="mx-4 text-cyan-600 hover:text-blue-800"
            >
              {polish && "Pokaż szczegóły rejestracji mojego zwierzaka"}
              {english && "Show pet registration details"}
            </Link>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-1/2 mx-auto text-center mt-32 text-xl text-red-600">
        {polish &&
          "Z jednego konta użytkownika można zarejestrować tylko jednego zwierzaka."}
        {english && "One user cannot register more than one pet"}
      </div>
    );
  }
};

export default Details;
