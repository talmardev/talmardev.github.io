// ---------- DADOS INICIAIS ----------
const defaultNation = {
  name: "República Exemplo",
  economia: 50,
  popularidade: 50,
  liberdade: 50,
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

// ---------- TEMPO (1 decisão por dia) ----------
function canPlay(nation) {
  if (!nation.lastDecision) return true;

  const last = new Date(nation.lastDecision);
  const now = new Date();
  const diff = (now - last) / (1000 * 60 * 60);

  return diff >= 24;
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