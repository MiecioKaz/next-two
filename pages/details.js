import { useRouter } from "next/router";
import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";

const Details = () => {
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
  const { user } = useAuthContext();

  const handleFileChange = (e) => {
    setPetImage(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setImgError("Please select a file");
      return;
    }
    // if (!selected.type.includes("image")) {
    //   setImgError("Selected file must be an image");
    //   return;
    // }
    // if (selected.size > 100000) {
    //   setImgError("Image file size must be less than 100kB");
    //   return;
    // }

    setFormError(null);
    setPetImage(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!user) {
      setFormError(
        "Przed rejestacją zwierzaka wymagane zalogowanie się do systemu"
      );
      return;
    }

    const createdBy = {
      name: user.displayName,
      email: user.email,
      phoneNumber,
      id: user.uid,
    };

    const petDetails = {
      breed,
      description,
      whereabouts,
      createdBy,
    };

    await addDocument(petDetails, optionSet, petImage, breed);
    if (!state.error) {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Create Document</h1>
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
        <div>
          <h2>Zdjęcie zwierzaka</h2>
          <input
            required
            type="file"
            onChange={handleFileChange}
          />
        </div>
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
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>
        <button type="submit">Zapisz Dane</button>

        {formError && <p>{formError}</p>}
      </form>
    </div>
  );
};

export default Details;
