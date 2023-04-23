import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useLogout } from "../hooks/useLogout";
import Display from "./Display";
import { useRouter } from "next/router";

const Update = ({ petDoc, userId }) => {
  const [description, setDescription] = useState(petDoc.description);
  const [breed, setBreed] = useState(petDoc.breed);
  const [phoneNumber, setPhoneNumber] = useState(petDoc.createdBy.phoneNumber);
  const [whereabouts, setWhereabouts] = useState(petDoc.whereabouts);
  const [email, setEmail] = useState(petDoc.createdBy.email);
  const [name, setName] = useState(petDoc.createdBy.name);
  const [petImage, setPetImage] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [showDisplay, setShowDisplay] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { deleteDocument, updateDocument, state, error } = useFirestore();
  const { userDelete } = useLogout();
  const router = useRouter();

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
    if (!state.error) {
      setShowButton(true);
    }
  };

  const handleDelete = async () => {
    await deleteDocument(petDoc, userId);
    if (!state.error) {
      router.push("/");
    }
  };

  const handleDeleteUser = async () => {
    await deleteDocument(petDoc, userId);
    userDelete();
    if (!state.error) {
      router.push("/");
    }
  };

  const toggleDisplay = () => {
    setShowDisplay(!showDisplay);
    setShowButton(false);
  };

  return (
    <div>
      {!showDisplay && (
        <>
          {!state.isPending ? (
            <button onClick={handleDeleteUser}>Usuń konto użytkownika</button>
          ) : (
            <button>Czekaj</button>
          )}
          {!state.isPending ? (
            <button onClick={handleDelete}>Usuń dane zwierzaka</button>
          ) : (
            <button>Czekaj</button>
          )}

          <form onSubmit={handleSubmit}>
            {petDoc.coll !== "newHome" && (
              <div>
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
              <h2>Twoje imię:</h2>
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div>
              <h2>Adres email:</h2>
              <input
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <h2>Twój numer telefonu</h2>
              <input
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
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
            {!state.isPending && !showButton && (
              <button type="submit">Edytuj</button>
            )}
            {state.isPending && !showButton && (
              <button disabled>loading</button>
            )}
          </form>
          {state.error && <div>{error}</div>}
        </>
      )}
      {showButton && (
        <button onClick={toggleDisplay}>Pokaż dane po edycji</button>
      )}
      {showDisplay && (
        <Display
          details={state.document}
          toggleDisplay={toggleDisplay}
        />
      )}
    </div>
  );
};

export default Update;
