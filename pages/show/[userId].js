import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import Update from "../../components/Update";
import { useFirestore } from "../../hooks/useFirestore";
import { useRouter } from "next/router";
import { useAuthContext } from "../../hooks/useAuthContext";

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
  const { state } = useFirestore();
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuthContext();

  if (petDoc) {
    return (
      <div>
        {!isDisplayed && (
          <>
            {!state.isPending ? (
              <button onClick={() => setIsDisplayed(true)}>Edytuj</button>
            ) : (
              <button>Czekaj</button>
            )}

            <div>
              {user && (
                <h1>
                  Wykaz danych zwierzaka zarejestrowanego przez{" "}
                  {user.displayName}
                </h1>
              )}
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
            {state.error && <div>{error}</div>}
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
