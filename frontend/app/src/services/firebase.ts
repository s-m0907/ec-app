import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  arrayUnion,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Exhibition } from "../types";

export const addUser = async (username: string, email: string, uid: string) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      username: username,
      email: email,
    });
    console.log("User document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getExhibitions = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "exhibitions"),
    );
    const exhibitions: Exhibition[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      exhibitions.push({
        id: doc.id,
        exhibition_name: data.exhibition_name || "",
        artwork_ids: data.artwork_ids || [],
      } as Exhibition);
    });
    return exhibitions;
  } catch (error) {
    console.error("Error fetching exhibitions: ", error);
  }
};

export const addArtwork = async (
  userId: string,
  exhibition_name: string,
  artwork_id: number | string,
  api: string,
  iiif: string,
) => {
  try {
    const exhibitionRef = doc(
      db,
      "users",
      userId,
      "exhibitions",
      exhibition_name,
    );

    await setDoc(
      exhibitionRef,
      {
        exhibition_name: exhibition_name,
        artwork_ids: arrayUnion({
          artwork_id: artwork_id,
          api: api,
          iiif: iiif,
        }),
      },
      { merge: true },
    );

    console.log("Exhibition updated or created:", exhibition_name);
  } catch (error) {
    console.error("Error updating exhibition:", error);
  }
};

export const removeArtwork = async (
  userId: string,
  exhibition_name: string,
  artwork_id_to_remove: number | string,
) => {
  try {
    const exhibitionRef = doc(
      db,
      "users",
      userId,
      "exhibitions",
      exhibition_name,
    );

    const querySnapshot = await getDoc(exhibitionRef);
    const data = querySnapshot.data() as Exhibition;
    const artwork_array = data?.artwork_ids;

    const updated_artwork_array = artwork_array.filter(
      (artwork) => artwork.artwork_id !== artwork_id_to_remove,
    );

    await updateDoc(exhibitionRef, {
      artwork_ids: updated_artwork_array,
    });
    console.log("Artwork removed from firestore");
  } catch (error) {
    console.error("Could not remove artwork:", error);
  }
};

export const deleteExhibition = async (userId: string, exhibitionName: string) => {
try {
  await deleteDoc(doc(db, "users", userId, "exhibitions", exhibitionName));
  console.log("Exhibition deleted")
} catch (error) {
  console.error("Could not delete Exhibition")
}
}

