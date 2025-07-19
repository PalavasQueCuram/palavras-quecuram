// components/GenerateButton.jsx
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { canGenerate } from "../utils/planUtils";
import { saveMessage } from "../utils/messageUtils";

const mensagens = {
  perdao: [
    "Se eu pudesse voltar no tempo, {{nome}}, faria tudo diferente. Hoje, só posso oferecer meu arrependimento sincero e a vontade de reconstruir nossa história lado a lado.",
    "Errar com você foi o golpe mais duro que me dei. Peço perdão, {{nome}}, e a chance de mostrar que aprendi com cada dor causada.",
    "Sinto muito, {{nome}}. Entendi que arrependimento não muda o passado, mas pode transformar o futuro. Se me permitir, quero tentar.",
    "{{nome}}, cada erro que cometi ecoa em mim. Não busco desculpas, só a chance de fazer diferente daqui em diante.",
    "{{nome}}, sei que falhei. Mas hoje, mais do que nunca, reconheço o valor do que perdemos e quero lutar pelo que ainda podemos viver.",
    "Nada justifica o que fiz, {{nome}}, mas meu coração pede a chance de reparar com atitudes o que minhas escolhas feriram."
  ],
  reconquista: [
    "{{nome}}, não estou aqui para insistir nem pressionar. Só quero dizer que o sentimento permanece inteiro e que, se ainda houver espaço, quero recomeçar com verdade e calma.",
    "Nada do que vivi se compara ao que sonhei construir ao seu lado. Se existir uma brecha, {{nome}}, quero tentar outra vez — com mais amor e sensatez.",
    "{{nome}}, sei que palavras não bastam, mas quero que saiba: meu coração continua esperando pelo nosso reencontro, com mais maturidade e carinho.",
    "Se for possível recomeçar, mesmo que devagar, estou disposto a percorrer esse caminho com você, {{nome}}. Sem prometer perfeição, mas com verdade.",
    "Ainda acredito no que éramos e no que podemos ser. Se você também sentir isso, {{nome}}, estou aqui — com calma, respeito e esperança.",
    "Nosso laço foi forte demais pra se apagar assim. Caso ainda exista sentimento, {{nome}}, quero reconstruir — passo a passo, juntos."
  ],
  paz: [
    "Nem todo amor termina; às vezes, ele apenas encontra outra forma. Desejo que sua vida seja leve, {{nome}}, mesmo que nossos caminhos sigam distantes.",
    "Que a paz encontre seu coração, {{nome}}. Guardo respeito e carinho pelo que fomos e pelo que cada um ainda pode ser.",
    "Independentemente de onde a vida nos leve, torço pela sua felicidade, {{nome}}. Que a calma e a alegria te acompanhem sempre.",
    "{{nome}}, que a serenidade se instale onde houve dor. Levo comigo as melhores lembranças e te desejo o bem, com sinceridade.",
    "Se não formos mais nós, que sejamos, ao menos, paz um para o outro. Fica meu desejo de luz e leveza para seus dias, {{nome}}.",
    "Te deixo livre com o coração grato, {{nome}}. Que cada passo seu seja guiado pela paz que talvez não consegui te dar."
  ],
  saudade: [
    "{{nome}}, sua ausência tem peso e silêncio. Sinto saudades não só do que vivemos, mas do que poderíamos viver.",
    "Cada lembrança sua me visita como um sussurro no coração. A saudade, {{nome}}, tem sido minha companheira constante.",
    "{{nome}}, há espaços no meu dia que só você preenchia. Sinto falta até do som da sua risada.",
    "Saudade não é só do que foi bom, mas do que foi verdadeiro. E com você, {{nome}}, tudo foi intensamente real.",
    "Não é só saudade de você, {{nome}}. É saudade de nós.",
    "Sinto falta até dos nossos silêncios, {{nome}}. Tudo era mais vivo com você por perto."
  ],
  gratidao: [
    "{{nome}}, mesmo com tudo, sou grato por ter te conhecido. Você marcou minha vida de formas que talvez nunca entenda.",
    "Agradeço por cada instante ao seu lado, {{nome}}. Levo comigo mais do que lembranças: levo aprendizado e amor.",
    "Mesmo que sigamos caminhos distintos, {{nome}}, serei sempre grato pelo que fomos e por tudo o que você me ensinou.",
    "Gratidão, {{nome}}, por ter me mostrado que o amor verdadeiro existe — e que ele transforma.",
    "Seu carinho, sua entrega, sua essência... tudo isso me marcou. Obrigado(a), {{nome}}.",
    "Ainda que hoje doa, {{nome}}, sou grato(a) por cada momento. O amor também é gratidão."
  ],
  esperanca: [
    "{{nome}}, ainda guardo esperança. Não de reviver o passado, mas de criar algo novo — com mais verdade e amor.",
    "Acredito que o tempo pode curar e reconectar. Se um dia nossos caminhos se cruzarem novamente, {{nome}}, que seja com mais maturidade.",
    "Mesmo nas noites mais difíceis, penso que ainda podemos florescer, {{nome}}.",
    "Espero que a vida nos permita reencontrar — não por acaso, mas por escolha, {{nome}}.",
    "Meu coração ainda acredita que há chance. Não para repetir, mas para recomeçar, {{nome}}.",
    "A esperança não morreu, {{nome}}. Ela só aprendeu a esperar com mais paciência e fé."
  ]
};

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