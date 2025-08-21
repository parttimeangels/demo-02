const sheetId = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";
const apiQuiz = `https://opensheet.elk.sh/${sheetId}/quiz`;

let questions = [];
let currentIndex = 0;
let scores = { G: 0, T: 0, A: 0 };
let selectedScore = null; // 선택된 값 임시 저장

// 질문 불러오기
async function loadQuestions() {
  try {
    const res = await fetch(apiQuiz);
    const data = await res.json();
    questions = data.map(q => q.questions);
    showQuestion();
  } catch (err) {
    console.error("질문 불러오기 실패:", err);
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

  selectedScore = null; // 새 질문 시작 시 초기화
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.classList.remove("selected"); // 선택 표시 초기화
  });
}

// 선택지 클릭
document.querySelectorAll(".option-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    // 모든 버튼에서 선택 표시 제거
    document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));

    // 현재 버튼만 선택 표시
    e.target.classList.add("selected");

    // 점수 임시 저장
    selectedScore = parseInt(e.target.dataset.score);
  });
});

// 다음 버튼
document.getElementById("next-btn").addEventListener("click", () => {
  if (selectedScore === null) {
    alert("답변을 선택해 주세요!");
    return;
  }

  // 점수 분배 (예시: 순서대로 G, T, A 반복)
  const types = ["G", "T", "A"];
  const type = types[currentIndex % types.length];
  scores[type] += selectedScore;

  console.log(`Q${currentIndex + 1}: ${type} +${selectedScore}`);

  currentIndex++;
  showQuestion();
});

// 결과 보여주기
function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  const bestType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  document.getElementById("result-text").textContent =
    `당신은 ${bestType} 유형 엔젤입니다! (G:${scores.G}, T:${scores.T}, A:${scores.A})`;
}

loadQuestions();
