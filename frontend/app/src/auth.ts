import { addUser } from "./firebase"
import { auth } from "./firebaseConfig"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

export const signUp = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const uid = user.uid
    await addUser(username, email, uid)
      return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const logOut = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}