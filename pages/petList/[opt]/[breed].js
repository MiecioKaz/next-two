import { useRouter } from "next/router";

const PetList = () => {
  const router = useRouter();
  const { opt, breed } = router.query;

  return (
    <div>
      <h1>
        Option: {opt}, Rasa: {breed}
      </h1>
    </div>
  );
};

export default PetList;
