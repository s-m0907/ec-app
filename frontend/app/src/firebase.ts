import { collection, addDoc } from "firebase/firestore"
import { db } from "./firebaseConfig";


export const addCollection = async (name: string, ids: number[]) => {
    try {
    const docRef = await addDoc(collection(db, "collections"), {
      name: name,
      ids: ids
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}