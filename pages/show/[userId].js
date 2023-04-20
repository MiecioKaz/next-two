import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import Update from "../../components/Update";
import { useFirestore } from "../../hooks/useFirestore";
import { useLogout } from "../../hooks/useLogout";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { userId } = context.params;

  const docSnap = await getDoc(doc(db, "pets", userId));

  let petDoc;
  if (docSnap.exists()) {
    petDoc = docSnap.data();
  } else {
    petDoc = null;
  }

  return {
    props: { petDoc }, // will be passed to the page component as props
  };
}

const Show = ({ petDoc }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const { deleteDocument, state } = useFirestore();
  const { userDelete } = useLogout();
  const router = useRouter();
  const { userId } = router.query;

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

  if (petDoc) {
    return (
      <div>
        {!isDisplayed && (
          <>
            <button onClick={handleDeleteUser}>Usuń konto użytkownika</button>
            <button onClick={handleDelete}>Usuń dane zwierzaka</button>
            <button onClick={() => setIsDisplayed(true)}>Edytuj</button>

            <div>
              <h1>Wykaz danych zarejestrowanego zwierzaka</h1>
              <div className="relative block w-72 h-72">
                <Image
                  src={petDoc.petImageUrl}
                  alt="pet-image"
                  fill
                  className="object-cover border rounded drop-shadow-lg"
                />
              </div>
              <h2>Rasa: {petDoc.breed}</h2>
              <h2>Opis zwierzaka:</h2>
              <p>{petDoc.description}</p>
              <h2>Miejsce pobytu: {petDoc.whereabouts}</h2>
              <h1>Dane kontaktowe:</h1>
              <h2>Imię: {petDoc.createdBy.name}</h2>
              <h2>Adres email: {petDoc.createdBy.email}</h2>
              <h2>Numer telefonu: {petDoc.createdBy.phoneNumber}</h2>
            </div>
          </>
        )}
        <div>
          {isDisplayed && (
            <Update
              petDoc={petDoc}
              userId={userId}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <div>Nie ma jeszcze danych twojego zwierzaka</div>;
  }
};

export default Show;
