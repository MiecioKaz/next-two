import { useReducer, useState } from "react";
import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
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
  const { user } = useAuthContext();

  const addDocument = async (petDetails, coll, petImage, breed) => {
    dispatch({ type: "IS_PENDING" });

    try {
      let imgUrl;
      if (petImage) {
        const uploadPath = ref(
          storage,
          `${coll}/${breed}/${user.uid}/${petImage.name}`
        );
        await uploadBytes(uploadPath, petImage);
        imgUrl = await getDownloadURL(ref(storage, uploadPath));

        await addDoc(collection(db, coll), {
          ...petDetails,
          petImageUrl: imgUrl,
        });
        dispatch({
          type: "ADDED_DOCUMENT",
          payload: { ...petDetails, petImageUrl: imgUrl },
        });
      } else {
        await addDoc(collection(db, coll), {
          ...petDetails,
        });
        dispatch({ type: "ADDED_DOCUMENT", payload: petDetails });
      }

      await addDoc(collection(db, "users"), {
        name: user.displayName,
        id: user.uid,
        collName: coll,
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocument = async (petDetails, petDoc, userDoc, petImage) => {
    dispatch({ type: "IS_PENDING" });

    try {
      let imgUrl;
      if (petImage) {
        const uploadPath = ref(
          storage,
          `${userDoc[0].collName}/${petDoc[0].breed}/${petDoc[0].id}/${petImage.name}`
        );
        await uploadBytes(uploadPath, petImage);
        imgUrl = await getDownloadURL(ref(storage, uploadPath));

        await setDoc(doc(db, userDoc[0].collName, petDoc[0].docId), {
          ...petDetails,
          petImageUrl: imgUrl,
        });
        dispatch({
          type: "UPDATED_DOCUMENT",
          payload: { ...petDetails, petImageUrl: imgUrl },
        });
      } else {
        if ("petImageUrl" in petDoc[0]) {
          imgUrl = petDoc[0].petImageUrl;
          await setDoc(doc(db, userDoc[0].collName, petDoc[0].docId), {
            ...petDetails,
            petImageUrl: imgUrl,
          });
          dispatch({
            type: "UPDATED_DOCUMENT",
            payload: { ...petDetails, petImageUrl: imgUrl },
          });
        } else {
          await setDoc(doc(db, userDoc[0].collName, petDoc[0].docId), {
            ...petDetails,
          });
          dispatch({ type: "UPDATED_DOCUMENT", payload: petDetails });
        }
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (petDoc, userDoc) => {
    try {
      if ("petImageUrl" in petDoc[0]) {
        const imgRef = ref(storage, petDoc[0].petImageUrl);
        await deleteObject(imgRef);
      }
      await deleteDoc(doc(db, userDoc[0].collName, petDoc[0].docId));
      await deleteDoc(doc(db, "users", userDoc[0].userDocId));
      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };
  console.log(state.document);

  return { state, addDocument, updateDocument, deleteDocument };
};
