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
import { db } from "./firebaseConfig";
import { Artwork, Exhibition, User } from "../types";

export const addUser = async (
  username: string,
  email: string,
  uid: string
): Promise<void> => {
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

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    } else {
      console.warn(`User with ID ${userId} not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw new Error("Could not fetch user data");
  }
};

export const getExhibitions = async (
  userId: string
): Promise<Exhibition[] | null> => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "exhibitions")
    );
    const exhibitions: Exhibition[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      exhibitions.push({
        id: doc.id,
        exhibition_name: data.exhibition_name || "",
        exhibition_artworks: data.exhibition_artworks || [],
      } as Exhibition);
    });
    return exhibitions;
  } catch (error) {
    console.error("Error fetching exhibitions: ", error);
    throw new Error("could not fetch exhibition data");
  }
};

export const addArtwork = async (
  userId: string,
  exhibition_name: string,
  exhibitionArtwork: Artwork
): Promise<void> => {
  try {
    const exhibitionRef = doc(
      db,
      "users",
      userId,
      "exhibitions",
      exhibition_name
    );

    await setDoc(
      exhibitionRef,
      {
        exhibition_name: exhibition_name,
        exhibition_artworks: arrayUnion(exhibitionArtwork),
      },
      { merge: true }
    );

    console.log("Exhibition updated or created:", exhibition_name);
  } catch (error) {
    console.error("Error updating exhibition:", error);
  }
};

export const removeArtwork = async (
  userId: string,
  exhibition_name: string,
  artwork_id_to_remove: number | string
): Promise<void> => {
  try {
    const exhibitionRef = doc(
      db,
      "users",
      userId,
      "exhibitions",
      exhibition_name
    );

    const querySnapshot = await getDoc(exhibitionRef);
    const data = querySnapshot.data() as Exhibition;
    const artwork_array = data?.exhibition_artworks;

    const updated_artwork_array = artwork_array.filter(
      (artwork) => artwork.id !== artwork_id_to_remove
    );

    await updateDoc(exhibitionRef, {
      exhibition_artworks: updated_artwork_array,
    });
    console.log("Artwork removed from firestore");
  } catch (error) {
    console.error("Could not remove artwork:", error);
  }
};

export const deleteExhibition = async (
  userId: string,
  exhibitionName: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, "users", userId, "exhibitions", exhibitionName));
    console.log("Exhibition deleted");
  } catch (error) {
    console.error("Could not delete Exhibition");
  }
};
