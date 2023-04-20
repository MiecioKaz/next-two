import { collection, query, where, getDocs } from "firebase/firestore";
import PetData from "../../../components/PetData";
import { db } from "../../../firebase/config";

export async function getStaticPaths() {
  const opts = ["lost", "found", "relocate", "newHome"];
  const breeds = ["dog", "cat", "other"];

  const pathsList = [];

  let opt;
  let breed;
  for (opt of opts) {
    for (breed of breeds) {
      pathsList.push({ params: { opt: `${opt}`, breed: `${breed}` } });
    }
  }

  return {
    paths: pathsList,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let results = [];
  const q = query(
    collection(db, "pets"),
    where("coll", "==", params.opt),
    where("breed", "==", params.breed)
  );
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    results.push({ ...doc.data(), id: doc.id, coll: params.opt });
  });
  return {
    props: { petDetails: results },
    revalidate: 10,
  };
}

const PetListDisplay = ({ petDetails }) => {
  console.log(petDetails);
  const newHome = petDetails.filter((item) => item.coll === "newHome");
  const rest = petDetails.filter((item) => item.coll !== "newHome");

  return (
    <div className="text-gray-600">
      {petDetails.length !== 0 ? (
        <>
          <h1 className="text-center text-3xl italic my-10">
            Wykaz zarejestrowanych zwierzaków
          </h1>
          {newHome.length !== 0 && (
            <ul className="w-6/12 mx-auto p-2 bg-white">
              {newHome.map((itemSet) => (
                <li key={itemSet.id}>
                  <h2 className="mb-2 italic">
                    Charakterystyka poszukiwanego zwierzaka:
                  </h2>
                  <p className="text-black">{itemSet.description}</p>
                  <div className="relative group text-center">
                    <button className="p-1 mt-2 border-2 rounded-2xl bg-amber-100 focus:border-rose-600">
                      Dane kontaktowe
                    </button>
                    <div className="absolute hidden bg-slate-600 group-focus-within:block px-4 text-white">
                      <h1>Dane kontaktowe</h1>
                      <h2>Imię: {itemSet.createdBy.name}</h2>
                      <h2>Adres email:</h2>
                      <p>{itemSet.createdBy.email}</p>
                      <h2>Numer telefonu:</h2>
                      <p>{itemSet.createdBy.phoneNumber}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {rest.length !== 0 && (
            <div className="grid grid-cols-3 gap-4">
              {rest.map((detailsSet) => (
                <PetData
                  key={detailsSet.id}
                  detailsSet={detailsSet}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <h1>Nie ma jeszcze zgłoszeń</h1>
      )}
    </div>
  );
};

export default PetListDisplay;
