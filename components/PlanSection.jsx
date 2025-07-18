export default function PlanSection() {
  return (
    <div className="bg-gray-100 p-6 rounded-xl text-center mt-8">
      <h2 className="text-2xl font-semibold mb-2">Plano Premium</h2>
      <p className="mb-4">
        Tenha acesso ilimitado às mensagens geradas. Ideal para quem deseja emocionar todos os dias sem limites.
      </p>
      <a
        href="https://seu-link-de-assinatura.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Assinar agora
      </a>
    </div>
  );
}
