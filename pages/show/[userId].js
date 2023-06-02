import Image from "next/image";
import Link from "next/link";
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
    props: { petDoc },
  };
}

const Show = ({ petDoc }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuthContext();
  const { state, deleteDocument } = useFirestore();

  const handleDelete = async () => {
    await deleteDocument(petDoc, userId);
  };
  if (state.success) {
    router.push("/");
  }

  if (petDoc) {
    return (
      <div className="w-1/2 mx-auto mt-12">
        {!isDisplayed && (
          <>
            {user && (
              <h1 className="text-xl text-indigo-700 mb-20">
                Wykaz danych zwierzaka zarejestrowanego przez {user.displayName}
              </h1>
            )}

            {petDoc.coll !== "newHome" && (
              <div className="relative inline-block w-52 h-52 mb-6">
                <Image
                  src={petDoc.petImageUrl}
                  alt="pet-image"
                  fill
                  className="object-cover object-center border rounded drop-shadow-lg"
                />
              </div>
            )}

            <div>
              <h2 className="text-lg text-indigo-700 ml-2">Opis zwierzaka</h2>
              <div className="text-lg h-16 pt-2 pl-3 mt-1 mb-3  bg-white border border-slate-200 drop-shadow-lg">
                {petDoc.description}
              </div>
              <h2 className="text-lg text-indigo-700 ml-2">Miejsce pobytu</h2>
              <div className="text-lg h-10 pl-3 pt-1 mb-3 bg-white border border-slate-200 drop-shadow-lg">
                {petDoc.whereabouts}
              </div>

              <h2 className="text-lg text-indigo-700 ml-2">Dane kontaktowe</h2>
              <div className="text-lg pl-3 py-2 bg-white border border-slate-200 drop-shadow-lg">
                <h2>Imię: {petDoc.createdBy.name}</h2>
                <h2 className="my-2">Adres email: {petDoc.createdBy.email}</h2>
                <h2>Numer telefonu: {petDoc.createdBy.phoneNumber}</h2>
              </div>
              <div>
                <button
                  onClick={() => setIsDisplayed(true)}
                  className="text-lg text-fuchsia-700 hover:text-lime-500 ml-3 mt-4"
                >
                  Edytuj
                </button>
              </div>

              <div>
                <button
                  onClick={handleDelete}
                  className="text-lg text-fuchsia-700 hover:text-lime-500 ml-3 mt-4"
                >
                  {!state.isPending ? "Usuń dane zwierzaka" : "Czekaj"}
                </button>
              </div>
            </div>

            {state.error && (
              <p className="text-red-500 text-lg mt-10">{state.error}</p>
            )}
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
    return (
      <div className="w-1/2 mx-auto text-center text-xl mt-20">
        <p className="my-10 text-xl text-rose-700">
          Nie ma jeszcze danych twojego zwierzaka
        </p>
        <Link
          href={`/details/${userId}`}
          className="text-purple-700 hover:text-yellow-400"
        >
          Zarejestruj zwierzaka
        </Link>
      </div>
    );
  }
};

export default Show;
