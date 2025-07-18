import { useState } from "react";
import { auth } from "../firebaseConfig";
import { canGenerate } from "../utils/planUtils";
import { saveMessage } from "../utils/messageUtils";

export default function GenerateButton({ onGenerate }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const user = auth.currentUser;

    if (!user) {
      alert("Por favor, faça login para gerar mensagens.");
      setLoading(false);
      return;
    }

    const allowed = await canGenerate(user.uid);
    if (!allowed) {
      alert("Limite diário atingido. Assine o plano premium para continuar gerando mensagens ilimitadas.");
      setLoading(false);
      return;
    }

    const message = await onGenerate();
    if (message) await saveMessage(user.uid, message);

    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
      disabled={loading}
    >
      {loading ? "Gerando..." : "Gerar mensagem"}
    </button>
  );
}
