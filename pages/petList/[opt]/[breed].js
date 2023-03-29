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
  // const { opt, breed } = context.params;

  let results = [];
  const q = query(
    collection(db, params.opt),
    where("breed", "==", params.breed)
  );
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    results.push({ ...doc.data(), id: doc.id });
  });
  return {
    props: { petDetails: results },
    revalidate: 10,
  };
}

const PetListDisplay = ({ petDetails }) => {
  console.log(petDetails);
  return (
    <div className="text-gray-600">
      {petDetails.length !== 0 ? (
        <>
          <h1 className="text-center text-3xl italic my-10">
            Wykaz zarejestrowanych zwierzaków
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {petDetails.map((detailsSet) => (
              <PetData
                key={detailsSet.id}
                detailsSet={detailsSet}
              />
            ))}
          </div>
        </>
      ) : (
        <h1>Nie ma jeszcze zgłoszeń</h1>
      )}
    </div>
  );
};

export default PetListDisplay;
