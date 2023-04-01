import Image from "next/image";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export async function getServerSideProps(context) {
  const { userId } = context.params;

  // retrieve collection name relating to user
  const userDoc = [];
  const q = query(collection(db, "users"), where("id", "==", userId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    userDoc.push(doc.data());
  });

  // retrieve pet reg data relating to user
  const petDoc = [];
  const qq = query(
    collection(db, userDoc[0].collName),
    where("id", "==", userId)
  );
  const querySnap = await getDocs(qq);

  querySnap.forEach((doc) => {
    petDoc.push({ ...doc.data(), docId: doc.id });
  });

  return {
    props: { petDoc }, // will be passed to the page component as props
  };
}

const Show = ({ petDoc }) => {
  console.log(petDoc[0].docId);

  return (
    <div>
      <h1>Wykaz danych zarejestrowanego zwierzaka</h1>
      <div className="relative block w-72 h-72">
        <Image
          src={petDoc[0].petImageUrl}
          alt="pet-image"
          fill
          className="object-cover border rounded drop-shadow-lg"
        />
      </div>
      <h2>Rasa: {petDoc[0].breed}</h2>
      <h2>Opis zwierzaka:</h2>
      <p>{petDoc[0].description}</p>
      <h2>Miejsce pobytu: {petDoc[0].whereabouts}</h2>
      <h1>Dane kontaktowe:</h1>
      <h2>Imię: {petDoc[0].createdBy.name}</h2>
      <h2>Adres email: {petDoc[0].createdBy.email}</h2>
      <h2>Numer telefonu: {petDoc[0].createdBy.phoneNumber}</h2>
    </div>
  );
};

export default Show;
