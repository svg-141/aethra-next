import { db } from '../db/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const reviewsCollection = collection(db, 'reviews');

export const createReview = async (reviewData: any) => {
  try {
    const docRef = await addDoc(reviewsCollection, reviewData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating review: ", error);
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const querySnapshot = await getDocs(reviewsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting reviews: ", error);
    throw error;
  }
};

export const getReview = async (reviewId: string) => {
  try {
    const docRef = doc(db, 'reviews', reviewId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting review: ", error);
    throw error;
  }
};

export const updateReview = async (reviewId: string, reviewData: any) => {
  try {
    const docRef = doc(db, 'reviews', reviewId);
    await updateDoc(docRef, reviewData);
  } catch (error) {
    console.error("Error updating review: ", error);
    throw error;
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const docRef = doc(db, 'reviews', reviewId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting review: ", error);
    throw error;
  }
};
