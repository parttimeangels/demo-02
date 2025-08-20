// app.js (완성형)

// Google Sheet API 설정
const SHEET_ID = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";
const QUIZ_RANGE = "quiz!A2:C"; // no, quiz, type
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&range=${QUIZ_RANGE}`;

let quizData = [];
let currentQuestion = 0;
let userAnswers = [];

let angelsData = {}; // angels.json 데이터 담을 곳

// DOM 요소
const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resultSection = document.getElementById("result");
const quizSection = document.getElementById("quiz");
const bestMatchBox = document.getElementById("best-match");
const otherMatchesBox = document.getElementById("other-matches");
const restartBtn = document.getElementById("restartBtn");

// 1. 구글 시트에서 질문 불러오기
async function loadQuiz() {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    const json = JSON.parse(text.substr(47).slice(0, -2)); // 구글시트 JSON 파싱
    quizData = json.table.rows.map(r => ({
      no: r.c[0]?.v,
      quiz: r.c[1]?.v,
      type: r.c[2]?.v
    }));
    showQuestion();
  } catch (error) {
    console.error("구글 시트 로드 오류:", error);
  }
}

// 2. angels.json 불러오기
async function loadAngels() {
  try {
    const res = await fetch("./angels.json");
    angelsData = await res.json();
  } catch (error) {
    console.error("angels.json 로드 오류:", error);
  }
}

// 3. 질문 표시
function showQuestion() {
  const q = quizData[currentQuestion];
  questionBox.textContent = `${q.no}. ${q.quiz}`;

  optionsBox.innerHTML = "";
  const options = ["전혀 그렇지 않다", "그렇지 않다", "보통이다", "그렇다", "매우 그렇다"];

  options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => selectAnswer(idx + 1); // 점수 = 1~5
    if (userAnswers[currentQuestion] === idx + 1) {
      btn.classList.add("selected");
    }
    optionsBox.appendChild(btn);
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = !userAnswers[currentQuestion];
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? "결과보기" : "다음";
}

// 4. 답변 선택
function selectAnswer(score) {
  userAnswers[currentQuestion] = score;
  showQuestion();
  nextBtn.disabled = false;
}

// 5. 다음 / 이전 버튼
nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    calculateResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

// 6. 점수 계산
function calculateResult() {
  const score = { G: 0, T: 0, A: 0 };

  quizData.forEach((q, i) => {
    const ans = userAnswers[i];
    if (q.type && ans) {
      score[q.type] += ans;
    }
  });

  // 주요/보조 성향 판별
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const mainType = sorted[0][0]; // 1순위
  const subType = sorted[1][0];  // 2순위

  const key = mainType + subType; // 예: GT, AG
  showResult(key, sorted);
}

// 7. 결과 표시
function showResult(typeKey, sortedScores) {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const best = angelsData[typeKey];
  bestMatchBox.innerHTML = `
    <h3>${best.title}</h3>
    <p>${best.description}</p>
    <p><strong>키워드:</strong> ${best.keywords.join(", ")}</p>
    <p><strong>성장방향:</strong> ${best.growth}</p>
  `;

  otherMatchesBox.innerHTML = "";
  sortedScores.slice(1).forEach(([k, v]) => {
    const altKey = k + sortedScores.find(([x]) => x !== k)[0]; 
    if (angelsData[altKey]) {
      const alt = angelsData[altKey];
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${alt.title}</h4>
        <p>${alt.description}</p>
      `;
      otherMatchesBox.appendChild(div);
    }
  });
}

// 8. 다시하기
restartBtn.addEventListener("click", () => {
  userAnswers = [];
  currentQuestion = 0;
  quizSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
  showQuestion();
});

// 실행
loadQuiz();
loadAngels();
