import Image from "next/image";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import Update from "../../components/Update";
import { useFirestore } from "../../hooks/useFirestore";
import { useRouter } from "next/router";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLangContext } from "../../hooks/useLangContext";

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
  const { polish, english } = useLangContext();

  const handleDelete = async () => {
    await deleteDocument(petDoc, userId);
  };
  if (state.success) {
    router.push("/");
  }

  if (petDoc) {
    return (
      <div className="w-2/3 md:w-1/2 mx-auto mt-12 mb-10">
        {!isDisplayed && (
          <>
            {user && (
              <h1 className="text-lg md:text-xl text-center text-indigo-700 mb-20">
                {polish &&
                  `Wykaz danych zwierzaka zarejestrowanego przez ${user.displayName}`}
                {english &&
                  `The list of pet details registered by ${user.displayName}`}
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
              <h2 className="text-lg text-indigo-700 ml-2">
                {polish && "Opis zwierzaka"}
                {english && "Pet description"}
              </h2>
              <div className="text-lg h-16 pt-2 pl-3 mt-1 mb-3  bg-white border border-slate-200 drop-shadow-lg">
                {petDoc.description}
              </div>
              <h2 className="text-lg text-indigo-700 ml-2">
                {polish && "Miejsce pobytu"}
                {english && "Pet whereabouts"}
              </h2>
              <div className="text-lg h-10 pl-3 pt-1 mb-3 bg-white border border-slate-200 drop-shadow-lg">
                {petDoc.whereabouts}
              </div>

              <h2 className="text-lg text-indigo-700 ml-2">
                {polish && "Dane kontaktowe"}
                {english && "Contact details"}
              </h2>
              <div className="text-lg pl-3 py-2 bg-white border border-slate-200 drop-shadow-lg">
                <h2>
                  {polish && `Imię: ${petDoc.createdBy.name}`}
                  {english && `Name: ${petDoc.createdBy.name}`}
                </h2>
                <h2 className="my-2">
                  {polish && `Adres email: ${petDoc.createdBy.email}`}
                  {english && `Email address: ${petDoc.createdBy.email}`}
                </h2>
                <h2>
                  {polish && `Numer telefonu: ${petDoc.createdBy.phoneNumber}`}
                  {english && `Phone number: ${petDoc.createdBy.phoneNumber}`}
                </h2>
              </div>
              <div>
                <button
                  onClick={() => setIsDisplayed(true)}
                  className="text-lg text-fuchsia-700 hover:text-lime-500 ml-3 mt-4"
                >
                  {polish && "Edytuj"}
                  {english && "Edit"}
                </button>
              </div>

              <div>
                {polish && (
                  <button
                    onClick={handleDelete}
                    className="text-lg text-fuchsia-700 hover:text-lime-500 ml-3 mt-4"
                  >
                    {!state.isPending ? "Usuń dane zwierzaka" : "Czekaj..."}
                  </button>
                )}
                {english && (
                  <button
                    onClick={handleDelete}
                    className="text-lg text-fuchsia-700 hover:text-lime-500 ml-3 mt-4"
                  >
                    {!state.isPending ? "Delete pet details" : "Wait..."}
                  </button>
                )}
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
          {polish && "Nie ma jeszcze danych twojego zwierzaka"}
          {english && "No pet details yet"}
        </p>
        <Link
          href={`/details/${userId}`}
          className="text-purple-700 hover:text-yellow-400"
        >
          {polish && "Zarejestruj zwierzaka"}
          {english && "Register pet"}
        </Link>
      </div>
    );
  }
};

export default Show;
