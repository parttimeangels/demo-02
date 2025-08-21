let quiz = [];
let angels = {};

async function loadData() {
  // 질문 (quiz.json)
  const quizRes = await fetch("quiz.json");
  quiz = await quizRes.json();

  // 엔젤 유형 (angels.json)
  const angelsRes = await fetch("angels.json");
  angels = await angelsRes.json();

  renderQuiz();
}

function renderQuiz() {
  const form = document.getElementById("quizForm");
  form.innerHTML = "";

  quiz.forEach((q, idx) => {
    const field = document.createElement("div");
    field.classList.add("question");

    field.innerHTML = `
      <label>${idx + 1}. ${q.question}</label>
      <select name="q${idx}">
        <option value="">선택하세요</option>
        <option value="3">매우 그렇다</option>
        <option value="2">그렇다</option>
        <option value="1">아니다</option>
        <option value="0">전혀 아니다</option>
      </select>
    `;

    form.appendChild(field);
  });
}

function calculateResult() {
  const form = document.getElementById("quizForm");
  const formData = new FormData(form);

  let scores = { A: 0, G: 0, H: 0, T: 0 }; // Angel 유형
  let answered = 0;

  quiz.forEach((q, idx) => {
    const value = formData.get(`q${idx}`);
    if (value !== "") {
      answered++;
      scores[q.type] += parseInt(value, 10);
    }
  });

  if (answered < quiz.length) {
    alert("모든 질문에 답해주세요!");
    return;
  }

  showResult(scores);
}

function showResult(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((sum, [, val]) => sum + val, 0);

  const top3 = sorted.slice(0, 3);
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = "<h2>결과</h2>";

  top3.forEach(([type, score], idx) => {
    const percentage = ((score / total) * 100).toFixed(1);
    const angel = angels[type];

    resultContainer.innerHTML += `
      <div class="result-card ${idx === 0 ? 'first' : ''}">
        <h3><b>${angel.title}</b> (${percentage}%)</h3>
        <p>${angel.description}</p>
        <p><strong>Keywords:</strong> ${angel.keywords.join(", ")}</p>
        <p><strong>Growth:</strong> ${angel.growth}</p>
      </div>
    `;
  });
}

document.getElementById("submitBtn").addEventListener("click", calculateResult);

loadData();
