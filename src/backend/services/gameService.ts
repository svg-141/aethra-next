import { db } from '../db/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const gamesCollection = collection(db, 'games');

export const createGame = async (gameData: any) => {
  try {
    const docRef = await addDoc(gamesCollection, gameData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating game: ", error);
    throw error;
  }
};

export const getGames = async () => {
  try {
    const querySnapshot = await getDocs(gamesCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting games: ", error);
    throw error;
  }
};

export const getGame = async (gameId: string) => {
  try {
    const docRef = doc(db, 'games', gameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting game: ", error);
    throw error;
  }
};

export const updateGame = async (gameId: string, gameData: any) => {
  try {
    const docRef = doc(db, 'games', gameId);
    await updateDoc(docRef, gameData);
  } catch (error) {
    console.error("Error updating game: ", error);
    throw error;
  }
};

export const deleteGame = async (gameId: string) => {
  try {
    const docRef = doc(db, 'games', gameId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting game: ", error);
    throw error;
  }
};
