import { collection, addDoc, doc, getDocs, setDoc, arrayUnion } from "firebase/firestore"
import { db } from "./firebaseConfig"

export const addUser = async(username: string, email: string) => {
try{
  const docRef = await addDoc(collection(db, "users"), {
    username: username,
    email: email
  })
  console.log("User document written with ID: ", docRef.id)
} catch (e) {
  console.error("Error adding document: ", e)
}
}

export interface Exhibition {
  id: string
  exhibition_name: string
  artwork_ids: number[]
}

export const getExhibitions = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users", userId, "exhibitions"))
    const exhibitions: Exhibition[] = []

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data())

    const data = doc.data()
    exhibitions.push({
        id: doc.id,
        exhibition_name: data.exhibition_name || '',
        artwork_ids: data.artwork_ids || [] 
    } as Exhibition)
})
    return exhibitions
  } catch (error) {
    console.error("Error fetching exhibitions: ", error)
  }
}

export const addArtwork = async (userId: string, exhibition_name: string, artwork_id: number) => {
  try {
      const exhibitionRef = doc(db, 'users', userId, "exhibitions", exhibition_name)

      await setDoc(exhibitionRef, {
          exhibition_name: exhibition_name,
          artwork_ids: arrayUnion(artwork_id)
      }, { merge: true })

      console.log("Exhibition updated or created:", exhibition_name)
  } catch (error) {
      console.error("Error updating exhibition:", error)
  }
}