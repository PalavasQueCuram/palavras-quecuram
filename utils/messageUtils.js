import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

export async function saveMessage(uid, text) {
  const userMessagesRef = collection(db, "users", uid, "messages");
  await addDoc(userMessagesRef, {
    text,
    createdAt: serverTimestamp()
  });
}

export async function fetchMessages(uid) {
  const userMessagesRef = collection(db, "users", uid, "messages");
  const snapshot = await getDocs(userMessagesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
