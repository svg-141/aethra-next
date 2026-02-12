import { db } from '../db/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const usersCollection = collection(db, 'users');

export const createUser = async (userData: any) => {
  try {
    const docRef = await addDoc(usersCollection, userData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting users: ", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, userData);
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};
