// ---------- DADOS INICIAIS ----------
const defaultNation = {
  name: "República Exemplo",
  economia: 50,
  popularidade: 50,
  liberdade: 50,
  estabilidade: 50,
  militar: 50,
  relint: 50,
  seguranca: 50,
  lastDecision: null
};

// ---------- DILEMAS ----------
const dilemmas = [
  {
    text: "Os trabalhadores exigem um aumento salarial.",
    options: [
      {
        text: "Aumentar salários",
        effects: { economia: -5, popularidade: +10 }
      },
      {
        text: "Recusar exigências",
        effects: { popularidade: -10, liberdade: -5 }
      }
    ]
  },
  {
    text: "Empresas querem menos impostos.",
    options: [
      {
        text: "Reduzir impostos",
        effects: { economia: +10, popularidade: -5 }
      },
      {
        text: "Manter impostos",
        effects: { economia: -5, popularidade: +5 }
      }
    ]
  },
  {
    text: "O Ministro dos Negócios Estrangeiros foi acusado de estar num romance com uma diplomata estrangeira.",
    options: [
      {
        text: "Despedir o MNE.",
        effects: { relint: -3, popularidade: +10, estabilidade: +5 }
      },
      {
        text: "Manter o MNE e negar acusações",
        effects: { popularidade: -5, estabilidade: -5 }
      }
    ]
  },
  {
    text: "Um antigo chefe de governo foi assassinado.",
    options: [
      {
        text: "Legitimar novas despesas nas Forças Armadas com o assassinato.",
        effects: { relint: -3, militar: +10, estabilidade: -5, popularidade: +2 }
      },
      {
        text: "Condenar atentado.",
        effects: { popularidade: +5, seguranca: -2 }
      },
      {
        text: "Não comentar.",
        effects: { popularidade: -15, seguranca: -7, estabilidade: -5 }
      }
    ]
  },
  {
    text: "Foi revelado que nas últimas eleições, um delegado do partido do Governo tentou interferir com a contagem na sua mesa de voto.",
    options: [
      {
        text: "Abrir uma investigação formal ao delegado.",
        effects: { popularidade: +2, estabilidade: -1, liberdade: +4 }
      },
      {
        text: "Negar os factos",
        effects: { popularidade: -5, estabilidade: -3 }
      }
    ]
  }
  
];

// ---------- CARREGAR / GUARDAR ----------
function loadNation() {
  const saved = localStorage.getItem("nation");
  return saved ? JSON.parse(saved) : defaultNation;
}

function saveNation(nation) {
  localStorage.setItem("nation", JSON.stringify(nation));
}

// ---------- INTERFACE ----------
function updateUI(nation) {
  document.getElementById("nationName").innerText = nation.name;
  document.getElementById("economia").innerText = nation.economia;
  document.getElementById("popularidade").innerText = nation.popularidade;
  document.getElementById("liberdade").innerText = nation.liberdade;
}

// ---------- DILEMA ----------
function showDilemma(nation) {
  const dilemma = dilemmas[Math.floor(Math.random() * dilemmas.length)];

  document.getElementById("dilemmaText").innerText = dilemma.text;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  dilemma.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option.text;
    btn.onclick = () => {
      applyEffects(nation, option.effects);
      nation.lastDecision = new Date().toISOString();
      saveNation(nation);
      location.reload();
    };
    optionsDiv.appendChild(btn);
  });
}

// ---------- EFEITOS ----------
function applyEffects(nation, effects) {
  for (let stat in effects) {
    nation[stat] += effects[stat];
    if (nation[stat] < 0) nation[stat] = 0;
    if (nation[stat] > 100) nation[stat] = 100;
  }
}

// ---------- INÍCIO ----------
const nation = loadNation();
updateUI(nation);

if (canPlay(nation)) {
  showDilemma(nation);
} else {
  document.getElementById("dilemmaText").innerText =
    "Já tomaste uma decisão hoje. Volta amanhã.";
}