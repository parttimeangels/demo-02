const sheetId = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";
const apiQuiz = `https://opensheet.elk.sh/${sheetId}/quiz`;

let questions = [];
let currentIndex = 0;
let scores = { G: 0, T: 0, A: 0 };
let angels = {}; // 엔젤 데이터

// 질문 불러오기
async function loadQuestions() {
  try {
    const res = await fetch(apiQuiz);
    const data = await res.json();
    questions = data.map(q => q.questions); // 질문 텍스트만
    showQuestion();
  } catch (err) {
    console.error("질문 불러오기 실패:", err);
  }
}

// 엔젤 정보 불러오기
async function loadAngels() {
  try {
    const res = await fetch("angels.json");
    angels = await res.json();
  } catch (err) {
    console.error("엔젤 데이터 불러오기 실패:", err);
  }
}

// 질문 보여주기
function showQuestion() {
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }
  document.getElementById("question-number").textContent = 
    `질문 ${currentIndex + 1} / ${questions.length}`;
  document.getElementById("question-text").textContent = questions[currentIndex];
}

// 선택지 클릭
document.querySelectorAll(".option-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const score = parseInt(e.target.dataset.score);

    // 점수 분배 (예시: 순서대로 G, T, A 반복)
    const types = ["G", "T", "A"];
    const type = types[currentIndex % types.length];
    scores[type] += score;

    console.log(`선택: ${e.target.textContent}, ${type} +${score}`);
  });
});

// 다음 버튼
document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex++;
  showQuestion();
});

// 결과 보여주기
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  // 최고 점수 유형 찾기
  const bestType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  // angels.json에서 해당 유형 불러오기 (줄바꿈 포함)
  const angelInfo = angels[bestType] 
    ? `<strong>${angels[bestType].name}</strong><br>${angels[bestType].description}`
    : `${bestType} 유형 엔젤`;

  // HTML 출력 (줄바꿈 적용)
  document.getElementById("result-text").innerHTML = `당신은<br>${angelInfo}`;
}

// 실행
(async function init() {
  await loadAngels();
  await loadQuestions();
})();
