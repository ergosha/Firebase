
import { initializeApp } from "firebase/app";
import { getFirestore, collection,addDoc, serverTimestamp, query, onSnapshot, orderBy  } from 'firebase/firestore'


const firebaseConfig = {
// add your own configuration
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    MESSAGES
};