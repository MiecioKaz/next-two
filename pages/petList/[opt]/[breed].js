import { collection, query, where, getDocs } from "firebase/firestore";
import PetData from "../../../components/PetData";
import { db } from "../../../firebase/config";
import { useLangContext } from "../../../hooks/useLangContext";

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
  const { polish, english } = useLangContext();

  console.log(petDetails);
  const newHome = petDetails.filter((item) => item.coll === "newHome");
  const rest = petDetails.filter((item) => item.coll !== "newHome");

  return (
    <div className="text-gray-600">
      {petDetails.length !== 0 ? (
        <>
          <h1 className="text-center text-xl md:text-3xl italic my-10">
            {polish && "Wykaz zarejestrowanych zwierzaków"}
            {english && "The list of registered pets"}
          </h1>
          {newHome.length !== 0 && (
            <ul className="w-6/12 mx-auto p-2 bg-white">
              {newHome.map((itemSet) => (
                <li key={itemSet.id}>
                  <h2 className="mb-2 italic">
                    {polish && "Charakterystyka poszukiwanego zwierzaka:"}
                    {english && "Description of wanted pet:"}
                  </h2>
                  <p className="text-black">{itemSet.description}</p>
                  <div className="relative group text-center">
                    <button className="p-1 mt-2 border-2 rounded-2xl bg-amber-100 focus:border-rose-600">
                      {polish && "Dane kontaktowe"}
                      {english && "Contact details"}
                    </button>
                    <div className="absolute hidden bg-slate-600 group-focus-within:block px-4 text-white">
                      <h1>
                        {polish && "Dane kontaktowe"}
                        {english && "Contact details"}
                      </h1>
                      <h2>
                        {polish && `Imię: ${itemSet.createdBy.name}`}
                        {english && `Name: {itemSet.createdBy.name}`}
                      </h2>
                      <h2>
                        {polish && "Adres email:"}
                        {english && "Email address:"}
                      </h2>
                      <p>{itemSet.createdBy.email}</p>
                      <h2>
                        {polish && "Numer telefonu:"}
                        {english && "Phone number:"}
                      </h2>
                      <p>{itemSet.createdBy.phoneNumber}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {rest.length !== 0 && (
            // <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-wrap justify-evenly gap-6 mx-6">
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
        <div className="w-1/2 mx-auto text-center text-xl mt-20">
          <p className="my-10 text-xl text-rose-700">
            {polish && "Nie ma jeszcze zarejestrowanych zwierzaków"}
            {english && "There are no registered pets yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PetListDisplay;
