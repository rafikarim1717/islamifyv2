import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA67lDH3qK2nsgB89TJKRK70AFftLKzY4c",
  authDomain: "islamify-50cff.firebaseapp.com",
  projectId: "islamify-50cff",
  storageBucket: "islamify-50cff.appspot.com",
  messagingSenderId: "121155763310",
  appId: "1:121155763310:web:d2e5d6b4998a2e2ca37a7f",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


const usersCollection = collection(db, "users");
const songsCollection = collection(db, "songs");
const postsCollection = collection(db, "posts");
const generalPostsCollection = collection(db, "generalPosts");
const shalatPostsCollection = collection(db, "shalatPosts");
const alquranPostsCollection = collection(db, "alquranPosts");
const doaPostsCollection = collection(db, "doaPosts");
const hadistPostsCollection = collection(db, "hadistPosts");
const commentsCollection = collection(db, "comments");

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  postsCollection,
  generalPostsCollection,
  shalatPostsCollection,
  alquranPostsCollection,
  doaPostsCollection,
  hadistPostsCollection,
  storage,
};
