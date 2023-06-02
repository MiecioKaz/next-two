import { useReducer } from "react";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
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

  const addDocument = async (petDetails, petImage, docId) => {
    dispatch({ type: "IS_PENDING" });

    try {
      let imgUrl;
      if (petImage) {
        const uploadPath = ref(
          storage,
          `${petDetails.coll}/${petDetails.breed}/${docId}/${petImage.name}`
        );
        await uploadBytes(uploadPath, petImage);
        imgUrl = await getDownloadURL(ref(storage, uploadPath));

        await setDoc(doc(db, "pets", docId), {
          ...petDetails,
          petImageUrl: imgUrl,
        });
        dispatch({
          type: "ADDED_DOCUMENT",
          payload: { ...petDetails, petImageUrl: imgUrl },
        });
      } else {
        await setDoc(doc(db, "pets", docId), {
          ...petDetails,
        });
        dispatch({ type: "ADDED_DOCUMENT", payload: petDetails });
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocument = async (petDetails, petDoc, userId, petImage) => {
    dispatch({ type: "IS_PENDING" });

    try {
      let imgUrl;
      if (petImage) {
        const uploadPath = ref(
          storage,
          `${petDetails.coll}/${petDetails.breed}/${petDetails.docId}/${petImage.name}`
        );
        await uploadBytes(uploadPath, petImage);
        imgUrl = await getDownloadURL(ref(storage, uploadPath));

        await setDoc(doc(db, "pets", userId), {
          ...petDetails,
          petImageUrl: imgUrl,
        });
        const imgRef = ref(storage, petDoc.petImageUrl);
        await deleteObject(imgRef);

        dispatch({
          type: "UPDATED_DOCUMENT",
          payload: { ...petDetails, petImageUrl: imgUrl },
        });
      } else {
        if ("petImageUrl" in petDoc) {
          imgUrl = petDoc.petImageUrl;
          await setDoc(doc(db, "pets", userId), {
            ...petDetails,
            petImageUrl: imgUrl,
          });
          dispatch({
            type: "UPDATED_DOCUMENT",
            payload: { ...petDetails, petImageUrl: imgUrl },
          });
        } else {
          await setDoc(doc(db, "pets", userId), {
            ...petDetails,
          });
          dispatch({ type: "UPDATED_DOCUMENT", payload: petDetails });
        }
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (petDoc, userId) => {
    dispatch({ type: "IS_PENDING" });

    try {
      if ("petImageUrl" in petDoc) {
        const imgRef = ref(storage, petDoc.petImageUrl);
        await deleteObject(imgRef);
      }
      await deleteDoc(doc(db, "pets", userId));

      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  console.log(state.success);

  return { state, addDocument, updateDocument, deleteDocument };
};
