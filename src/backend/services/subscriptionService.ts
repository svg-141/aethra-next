import { db } from '../db/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

const subscriptionsCollection = collection(db, 'subscriptions');

export const createSubscription = async (subscriptionData: any) => {
  try {
    const docRef = await addDoc(subscriptionsCollection, subscriptionData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating subscription: ", error);
    throw error;
  }
};

export const getSubscriptions = async () => {
  try {
    const querySnapshot = await getDocs(subscriptionsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting subscriptions: ", error);
    throw error;
  }
};

export const getSubscription = async (subscriptionId: string) => {
  try {
    const docRef = doc(db, 'subscriptions', subscriptionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting subscription: ", error);
    throw error;
  }
};

export const updateSubscription = async (subscriptionId: string, subscriptionData: any) => {
  try {
    const docRef = doc(db, 'subscriptions', subscriptionId);
    await updateDoc(docRef, subscriptionData);
  } catch (error) {
    console.error("Error updating subscription: ", error);
    throw error;
  }
};

export const deleteSubscription = async (subscriptionId: string) => {
  try {
    const docRef = doc(db, 'subscriptions', subscriptionId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting subscription: ", error);
    throw error;
  }
};
