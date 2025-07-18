import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function canGenerate(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return false;

  const userData = userSnap.data();
  const today = new Date().toDateString();
  const lastDate = userData.lastGenerated;

  if (userData.plan === "premium") return true;

  if (lastDate !== today) {
    await updateDoc(userRef, {
      dailyUsage: 1,
      lastGenerated: today
    });
    return true;
  }

  if (userData.dailyUsage < 5) {
    await updateDoc(userRef, {
      dailyUsage: userData.dailyUsage + 1
    });
    return true;
  }

  return false;
}
