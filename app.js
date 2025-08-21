let currentQuestionIndex = 0;
let questions = [];
let answers = [];

// 점수 계산용
let scoreMatrix = [];
let types = [];

// 질문 불러오기
async function loadQuestions() {
  const quizUrl = "https://docs.google.com/spreadsheets/d/1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE/gviz/tq?sheet=quiz";
  const res = await fetch(quizUrl);
  const text = await res.text();
  const data = JSON.parse(text.substr(47).slice(0, -2));
  
  questions = data.table.rows.map(r => r.c[0].v);
  await loadScore();
  await loadTypes();
  renderQuestion();
}

// score 시트 불러오기
async function loadScore() {
  const scoreUrl = "https://docs.google.com/spreadsheets/d/1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE/gviz/tq?sheet=score";
  const res = await fetch(scoreUrl);
  const text = await res.text();
  const data = JSON.parse(text.substr(47).slice(0, -2));

  // score 시트는 각 문항별로 [순응, 맞섬, 회피, 균형] 가중치 들어있다고 가정
  scoreMatrix = data.table.rows.map(r => r.c.map(c => c ? c.v : 0));
}

// type 시트 불러오기
async function loadTypes() {
  const typeUrl = "https://docs.google.com/spreadsheets/d/1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE/gviz/tq?sheet=type";
  const res = await fetch(typeUrl);
  const text = await res.text();
  const data = JSON.parse(text.substr(47).slice(0, -2));

  types = data.table.rows.map(r => ({
    id: r.c[0].v,
    name: r.c[1].v,
    desc: r.c[2].v,
    job: r.c[3].v
  }));
}

function renderQuestion() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  const qText = questions[currentQuestionIndex];
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${currentQuestionIndex + 1}. ${qText}</p>
    <select id="answer">
      <option value="">선택하세요</option>
      <option value="3">매우 그렇다</option>
      <option value="2">그렇다</option>
      <option value="1">아니다</option>
      <option value="0">전혀 아니다</option>
    </select>
  `;
  container.appendChild(div);

  // 이전 응답 복원
  if (answers[currentQuestionIndex] !== undefined) {
    document.getElementById("answer").value = answers[currentQuestionIndex];
  }

  // 버튼 표시
  document.getElementById("prevBtn").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
  document.getElementById("nextBtn").style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
  document.getElementById("submitBtn").style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

document.getElementById("prevBtn").addEventListener("click", () => {
  saveAnswer();
  currentQuestionIndex--;
  renderQuestion();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  saveAnswer();
  currentQuestionIndex++;
  renderQuestion();
});

document.getElementById("quizForm").addEventListener("submit", (e) => {
  e.preventDefault();
  saveAnswer();
  calculateResult();
});

function saveAnswer() {
  const val = document.getElementById("answer").value;
  if (val !== "") {
    answers[currentQuestionIndex] = parseInt(val);
  }
}

function calculateResult() {
  let scores = [0, 0, 0, 0]; // 순응, 맞섬, 회피, 균형

  answers.forEach((ans, idx) => {
    if (ans !== undefined) {
      for (let t = 0; t < 4; t++) {
        scores[t] += ans * (scoreMatrix[idx][t] || 0);
      }
    }
  });

  // 가장 높은 점수 index 찾기
  let maxIndex = scores.indexOf(Math.max(...scores));
  let resultType = types[maxIndex];

  document.getElementById("result").innerHTML = `
    <h2>당신은 ${resultType.name} 입니다!</h2>
    <p>${resultType.desc}</p>
    <p><b>추천 직무:</b> ${resultType.job}</p>
  `;
}

loadQuestions();
