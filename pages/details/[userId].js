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
    console.log(selected.type);

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
    if (!state.error) {
      router.push("/");
    }
  };

  if (!isDocument) {
    return (
      <div>
        <h1>Rejestracja zwierzaka</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Powód rejestracji</h2>
            <select
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
            <div>
              <h2>Zdjęcie zwierzaka</h2>
              <input
                type="file"
                onChange={handleFileChange}
              />
              {imgError ? <p>{imgError}</p> : ""}
            </div>
          )}
          <div>
            <h2>Rasa zwierzaka</h2>
            <select
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
          <div>
            <h2>Opis zwierzaka</h2>
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div>
            <h2>Rejon Zaginięcia/Miejsce pobytu</h2>
            <input
              type="text"
              required
              onChange={(e) => setWhereabouts(e.target.value)}
              value={whereabouts}
            />
          </div>
          <div>
            <h2>Twój numer telefonu</h2>
            <input
              type="text"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          {!state.isPending && <button type="submit">Zapisz Dane</button>}
          {state.isPending && <button disabled>loading</button>}

          {formError && <p>{formError}</p>}
        </form>
        {state.error && <p>{state.error}</p>}

        <Link href={`/show/${userId}`}>
          Pokaż szczegóły rejestracji mojego zwierzaka
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        Z jednego konta użytkownika można zarejestrować tylko jednego zwierzaka.
      </div>
    );
  }
};

export default Details;
