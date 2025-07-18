import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebaseConfig";
import { logout } from "../auth";
import { fetchMessages } from "../utils/messageUtils";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      router.push("/");
      return;
    }

    setUser(currentUser);

    const loadUserData = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setPlan(userSnap.data().plan);
      }
      const msgs = await fetchMessages(currentUser.uid);
      setMessages(msgs);
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo, {user?.displayName}</h1>
      <p className="mb-2">Plano atual: <strong>{plan}</strong></p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mb-4"
      >
        Sair
      </button>

      <h2 className="text-xl font-semibold mb-2">Mensagens geradas:</h2>
      <ul className="list-disc list-inside space-y-2">
        {messages.map(msg => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}
