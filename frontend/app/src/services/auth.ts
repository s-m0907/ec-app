import { User } from "../types";
import { addUser } from "./db";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signUp = async (
  email: string,
  password: string,
  username: string,
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const uid = user.uid;

    await addUser(username, email, uid);
    return {
      id: uid,
      email: user.email || "",
      username: username,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("And unknown error occured during sign in");
    }
  }
};

export const signIn = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return {
      id: user.uid,
      email: user.email || "",
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("And unknown error occured during sign in");
    }
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("And unknown error occured during sign in");
    }
  }
};
