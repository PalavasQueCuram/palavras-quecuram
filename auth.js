import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const userRef = doc(db, "users", result.user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      plan: "basic",
      dailyUsage: 0,
      lastGenerated: null,
      createdAt: serverTimestamp()
    });
  }

  return result.user;
}

export async function logout() {
  await signOut(auth);
}

export { auth };
