import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	updateDoc,
	Timestamp,
	deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAuT7uvyfvUupdY6aK97aO58VUk9MCOn_k",
	authDomain: "invoice-app-f7fc6.firebaseapp.com",
	projectId: "invoice-app-f7fc6",
	storageBucket: "invoice-app-f7fc6.appspot.com",
	messagingSenderId: "817340155931",
	appId: "1:817340155931:web:027a53556397c8c2e8d0be",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
export {
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	Timestamp,
};
