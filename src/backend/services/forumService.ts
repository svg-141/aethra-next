import { db } from '../db/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const forumsCollection = collection(db, 'forums');

export const createForum = async (forumData: any) => {
  try {
    const docRef = await addDoc(forumsCollection, forumData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating forum: ", error);
    throw error;
  }
};

export const getForums = async () => {
  try {
    const querySnapshot = await getDocs(forumsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting forums: ", error);
    throw error;
  }
};

export const getForum = async (forumId: string) => {
  try {
    const docRef = doc(db, 'forums', forumId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting forum: ", error);
    throw error;
  }
};

export const updateForum = async (forumId: string, forumData: any) => {
  try {
    const docRef = doc(db, 'forums', forumId);
    await updateDoc(docRef, forumData);
  } catch (error) {
    console.error("Error updating forum: ", error);
    throw error;
  }
};

export const deleteForum = async (forumId: string) => {
  try {
    const docRef = doc(db, 'forums', forumId);
    await deleteDoc(docRef);
  } catch (error) ]
    console.error("Error deleting forum: ", error);
    throw error;
  }
};
