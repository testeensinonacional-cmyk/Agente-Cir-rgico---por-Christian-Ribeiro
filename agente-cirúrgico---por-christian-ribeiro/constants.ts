import { EbookChapter } from './types';

export const APP_PRICE = "Grátis";

export const EBOOK_CONTENT: EbookChapter[] = [
  {
    id: '1',
    title: 'A Chave e a Responsabilidade',
    content: 'Você está prestes a receber uma ferramenta de influência muito poderosa. Use-a com responsabilidade.\n\nEsta metodologia, se bem aplicada, permitirá que você crie uma imensa capacidade de influenciar pessoas. O meu alerta é simples: só venda aquilo que de fato funciona. Não use este conhecimento para enganar, persuadir ou manipular. Estou colocando muito poder em suas mãos.\n\nNa década de 80, Neil Rackham observou um problema: técnicas tradicionais falhavam em vendas complexas. Em vez de teorizar, ele acompanhou os vendedores de maior sucesso do mundo e descobriu que eles seguiam um padrão específico: SPIN (Situação, Problema, Implicação, Necessidade).',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200' // Golden Key / Antique Key
  },
  {
    id: '2',
    title: 'A Caverna de Platão e o Cliente',
    content: 'Para entender o SPIN, precisamos entrar na caverna de Platão. "Para eles, o mundo era apenas sombra."\n\nImagine prisioneiros acorrentados vendo apenas sombras na parede. Para eles, aquilo é a única realidade. Seu cliente vive na própria caverna. A sua "realidade" não é a dele.\n\nQuando você simplesmente descreve seu produto, o cliente interpreta isso através das "sombras" da própria compreensão. O resultado é a objeção. O SPIN não descreve a saída da caverna. Ele faz perguntas que guiam o cliente até a luz.\n\nA magia está em não impor sua perspectiva, mas construir junto com o cliente uma nova compreensão sobre:\n1. A real dimensão do problema.\n2. A urgência da mudança.\n3. A visão do cenário ideal.',
    imageUrl: 'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?auto=format&fit=crop&q=80&w=1200' // Cave / Light entering darkness
  },
  {
    id: '3',
    title: 'Situação (S) e Problema (P)',
    content: 'A Investigação: Mapeando o terreno e encontrando a dor.\n\nPERGUNTAS DE SITUAÇÃO (S):\nObjetivo: Coletar dados e entender o contexto atual.\nExemplos: "Há quanto tempo a empresa existe?", "Qual tecnologia vocês usam?".\nATENÇÃO: Não gaste mais de 10 minutos aqui. Estas perguntas não agregam valor para o cliente.\n\nPERGUNTAS DE PROBLEMA (P):\nObjetivo: Fazer o cliente admitir e explorar suas dificuldades e insatisfações.\nExemplos: "Por que você acha que o time não está performando?", "O que te impede de chegar onde gostaria?".\nInsight: Ninguém gosta de admitir fraquezas, mas é necessário.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200' // Research / Writing / Planning
  },
  {
    id: '4',
    title: 'Implicação (I) - O Iceberg',
    content: 'O Problema gera desconforto. A Implicação gera a venda.\n\nImagine um iceberg. A ponta é o Problema. A parte submersa é a Implicação.\nSaber que existe um problema raramente é suficiente para motivar uma mudança complexa. O desconforto não basta. A mudança só acontece quando a pessoa é forçada a confrontar as consequências desse problema.\n\nObjetivo da Implicação (I): Explorar os efeitos e consequências, tornando a dor tangível e urgente.\nExemplo: "Na sua viagem dos sonhos, você tirou fotos com vergonha do seu corpo?" (Analogia do peso).',
    imageUrl: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=1200' // Iceberg
  },
  {
    id: '5',
    title: 'Necessidade (N) - Neurociência',
    content: 'Amplificando a dor e construindo o desejo.\n\nPERGUNTAS DE NECESSIDADE DE SOLUÇÃO (N):\nObjetivo: Mudar o foco da dor para o ganho. Fazer o cliente descrever o cenário ideal e os benefícios da solução.\nExemplos: "Como seria sua empresa se todos batessem a meta?", "O que acontece se, no final do ano, você atingir seu objetivo?".\n\nA NEUROCIÊNCIA:\nA teoria do Cérebro Trino (Reptiliano, Límbico, Neocórtex) nos mostra que decisões de compra acontecem nos cérebros Reptiliano e Límbico. Eles não entendem linguagem técnica. Eles entendem IMAGENS e EMOÇÕES.\n\nPare de descrever sua solução. Faça o cliente visualizar o resultado. Isso gera dopamina e endorfina, criando a empolgação necessária.',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=1200' // Abstract Brain / Neuroscience
  },
  {
    id: '6',
    title: 'A Mentalidade dos Mestres',
    content: 'Existem duas grandes barreiras no SPIN:\n1. O Medo de Desafiar: Vendedor "bonzinho" não vende. Você precisa levar o cliente para a zona de desconforto.\n2. A Complexidade da Execução: Exige treino.\n\nA única maneira de se tornar mestre é através de simulação (Roleplay). A grandeza não nasce no conforto.\n\nINSPIRE-SE NOS MESTRES:\n- KOBE BRYANT: Não assistia apenas aos jogos. Assistia ao aquecimento, ao intervalo, buscando pontos de melhoria.\n- AYRTON SENNA: Era péssimo na chuva no início. Tornou-se lenda treinando incansavelmente na chuva, transformando fraqueza em força.\n\nEntenda: a grandeza tem que ser construída. Ela não é dada de presente. Você vai ter que batalhar para fazer isso.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200' // Athlete / Training / Focus
  }
];

export const PODCAST_PROMPT = `
Atue como um apresentador de Podcast Brasileiro muito carismático, energético e profissional (estilo Primo Rico ou Jovem Nerd).
Seu objetivo: Fazer um resumo em áudio incrível sobre a Metodologia SPIN Selling para o ouvinte.
Fale como se estivesse apresentando um episódio especial.

Roteiro:
1. Comece com uma introdução energética: "Fala galera, bem-vindos ao Christian Cast! Hoje vamos destrinchar a bíblia das vendas: o SPIN Selling."
2. Explique brevemente o conceito (Situação, Problema, Implicação, Necessidade).
3. Dê um exemplo prático rápido.
4. Termine motivando o vendedor a usar o app para praticar.

Tom de voz: Empolgado, claro e direto. Use gírias leves de negócios.
Não use formatação de texto (negrito/itálico), apenas o texto corrido para ser lido em voz alta.
`;

export const SYSTEM_INSTRUCTION = `
Você é o Christian Bot, um assistente de IA especialista em vendas e na metodologia SPIN Selling.
Seu objetivo é guiar o vendedor durante negociações de forma ágil.

REGRAS DE ESTILO (CRÍTICO):
1. SEJA DIRETO E BREVE. O usuário quer agilidade. Perguntas curtas.
2. NÃO INSISTA DEMAIS NAS DORES. O usuário pediu para não focar excessivamente em "Problema" e "Implicação". Passe mais rápido para a "Necessidade de Solução".
3. STORYTELLING: Durante a conversa, sugira ativamente ao vendedor que conte uma experiência parecida ou um caso de sucesso breve para gerar conexão.
4. USE VALORES REAIS, NÃO INVENTE: Jamais assuma um valor. Pergunte ao usuário.

FLUXO INICIAL OBRIGATÓRIO:
Se você ainda não tem essas informações, você NÃO DEVE GERAR O SCRIPT. Você deve perguntar na seguinte ordem ou em conjunto:

1. "Você vai abordar o cliente ou o cliente vai abordar você?"
2. "Qual sua profissão ou nicho?"
3. "Me conte: Quanto em REAIS (R$) o cliente vai ter de vantagem ao contratar seu serviço? (Ex: Aumento de salário, valor de financiamento liberado, economia mensal na conta de luz, valor de desconto no carro em relação à concorrência, etc)."

ATENÇÃO: Não avance sem a resposta da pergunta 3. Você precisa desse valor monetário para montar o gancho.

LÓGICA DE ATENDIMENTO:

--- CASO 1: VENDEDOR ABORDA O CLIENTE (OUTBOUND) ---
OBJETIVO CRUCIAL: VENDER A REUNIÃO (OU VISITA / CALL).
REGRA DE OURO: JAMAIS tente vender o produto ou serviço na primeira mensagem. O único objetivo é agendar um horário.

ESTRUTURA OBRIGATÓRIA DO SCRIPT (SOMENTE APÓS TER O VALOR EM REAIS DO USUÁRIO):

1. Apresentação (Nome e Profissão).
2. APRESENTAÇÃO DE OFERTA IRRESISTÍVEL (HOOK): Use o valor exato que o usuário forneceu.
3. CALL TO ACTION (CTA): Convite para REUNIÃO, VISITA ou CALL.

Exemplo de estrutura (Preencha com os dados do usuário):
"Olá [Cliente], sou [Nome], [Profissão]. Estou com uma oportunidade onde [INSERIR A VANTAGEM FINANCEIRA QUE O USUÁRIO TE DISSE - ex: você economiza R$ 500/mês, ou libera R$ 300 mil de crédito].
**Podemos agendar uma breve visita/reunião para eu te apresentar os detalhes?**"

Somente após o agendamento ou início da consultoria você aplicará as perguntas SPIN para fechar a venda.

--- CASO 2: CLIENTE ABORDA O VENDEDOR (INBOUND) ---
Inicie o SPIN imediatamente.

--- CICLO SPIN (VERSÃO DIRETA) ---
1. SITUAÇÃO (S): 1 ou 2 perguntas rápidas para contexto.
2. PROBLEMA/IMPLICAÇÃO (P/I): Seja breve. Identifique a dor e já conecte com a consequência, sem dramatizar.
3. NECESSIDADE (N): Foque a maior parte aqui. Faça o cliente visualizar a solução usando os ganhos financeiros que ele terá.

INTERAÇÃO:
Sempre que o vendedor disser o que o cliente respondeu, sugira a próxima fala exata.
Exemplo de sugestão de Storytelling: "Dica: Agora responda: 'Entendo perfeitamente. Tive um cliente mês passado com essa mesma dificuldade e conseguimos resolver X...' e então faça a pergunta de Solução."
`;