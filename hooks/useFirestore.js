import { useEffect, useReducer, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return { document: null, isPending: false, error: null, success: true };
    case "UPDATED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = () => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const { user } = useAuthContext();

  const conditionalDispatch = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc, coll, petImage, breed) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const uploadPath = ref(
        storage,
        `${coll}/${breed}/${user.uid}/${petImage.name}`
      );
      const img = await uploadBytes(uploadPath, petImage);
      const imgUrl = await getDownloadURL(ref(storage, uploadPath));

      const addedDocument = await addDoc(collection(db, coll), {
        ...doc,
        // createdAt: serverTimestamp(),
        petImageUrl: imgUrl,
      });
      conditionalDispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });

      await addDoc(collection(db, "users"), {
        id: user.uid,
        collName: coll,
      });
    } catch (err) {
      conditionalDispatch({ type: "ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { state, addDocument };
};
