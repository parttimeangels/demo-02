let currentQuestion = 0;
let answers = [];

// 질문 예시 (추후 JSON으로 분리 가능)
const questions = [
  { text: "조화와 균형을 중시하시나요?", options: ["예", "아니오"] },
  { text: "상대방의 감정을 쉽게 공감하시나요?", options: ["예", "아니오"] },
  { text: "불편해도 필요한 말은 직접 하나요?", options: ["예", "아니오"] }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const resultGrowth = document.getElementById("result-growth");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.text;
  answersEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      answers[currentQuestion] = opt;
    };
    answersEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  if (answers[currentQuestion] == null) {
    alert("답변을 선택하세요!");
    return;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function calculateResultKey() {
  // 아주 단순한 로직 (테스트용)
  // 실제는 점수 계산 방식 넣어야 함
  if (answers[0] === "예" && answers[1] === "예") return "GG";
  if (answers[0] === "예" && answers[2] === "예") return "GT";
  return "AA"; // 기본값
}

async function showResult() {
  try {
    const res = await fetch("angels.json");
    const data = await res.json();

    const resultKey = calculateResultKey();
    const angel = data[resultKey];

    if (!angel) {
      resultTitle.textContent = "결과를 불러올 수 없습니다.";
      resultDescription.textContent = "";
      return;
    }

    resultTitle.textContent = angel.title;
    resultDescription.textContent = angel.description;
    resultGrowth.textContent = angel.growth;

    document.getElementById("quiz-container").style.display = "none";
    resultEl.style.display = "block";
  } catch (e) {
    console.error(e);
    resultTitle.textContent = "에러 발생!";
  }
}

// 초기 로드
loadQuestion();
