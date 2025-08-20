좋습니다! 그러면 `app.js`를 **구글시트(quiz 시트) + angels.json** 구조에 맞춰 전체 수정 버전으로 드리겠습니다.
이미지는 빼고, 점수는 `quiz.score`(= G/T/A)와 응답값을 합산하는 방식으로 처리합니다.

```javascript
// app.js

// === 시트 & 데이터 경로 ===
const QUIZ_URL =
  "https://opensheet.vercel.app/1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE/quiz";
const ANGELS_URL = "./angels.json";

// === 상태값 ===
let questions = [];
let angels = [];
let currentIndex = 0;
let userAnswers = {}; // {no: score}

// === DOM 요소 ===
const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const bestMatchBox = document.getElementById("best-match");
const otherMatchesBox = document.getElementById("other-matches");
const restartBtn = document.getElementById("restartBtn");

// === 초기 로드 ===
window.addEventListener("DOMContentLoaded", async () => {
  // 1. 퀴즈 불러오기
  const qRes = await fetch(QUIZ_URL);
  questions = await qRes.json();

  // 2. 엔젤 불러오기
  const aRes = await fetch(ANGELS_URL);
  angels = await aRes.json();

  // 첫 질문 표시
  showQuestion(currentIndex);
});

// === 질문 표시 ===
function showQuestion(index) {
  const q = questions[index];
  if (!q) return;

  questionBox.textContent = `${q.no}. ${q.quiz}`;
  optionsBox.innerHTML = "";

  // 1~5 리커트 척도 옵션
  const labels = [
    "전혀 그렇지 않다",
    "그렇지 않다",
    "보통이다",
    "그렇다",
    "매우 그렇다",
  ];

  labels.forEach((label, i) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = "option-btn";
    btn.onclick = () => {
      userAnswers[q.no] = i + 1; // 1~5 점수 저장
      nextBtn.disabled = false;
    };
    optionsBox.appendChild(btn);
  });

  // 버튼 상태
  prevBtn.disabled = index === 0;
  nextBtn.disabled = !(q.no in userAnswers);
  nextBtn.textContent = index === questions.length - 1 ? "결과 보기" : "다음";
}

// === 네비게이션 ===
nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion(currentIndex);
  } else {
    calculateResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion(currentIndex);
  }
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  userAnswers = {};
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  showQuestion(currentIndex);
});

// === 결과 계산 ===
function calculateResult() {
  // GTA 점수 합산
  let score = { G: 0, T: 0, A: 0 };

  questions.forEach((q) => {
    const ans = userAnswers[q.no] || 0;
    if (q.score && score[q.score] !== undefined) {
      score[q.score] += ans;
    }
  });

  // 최고 점수 유형
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const bestType = sorted[0][0];

  // angels.json에서 매칭
  const bestAngel = angels.find((a) => a.type === bestType);
  const otherAngels = angels.filter((a) => a.type !== bestType);

  // UI 표시
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  bestMatchBox.innerHTML = "";
  bestMatchBox.appendChild(buildAngelCard(bestAngel, true));

  otherMatchesBox.innerHTML = "";
  otherAngels.forEach((angel) =>
    otherMatchesBox.appendChild(buildAngelCard(angel, false))
  );
}

// === 카드 빌더 === (이미지 제거)
function buildAngelCard(angel, isBest) {
  const wrap = document.createElement("div");
  wrap.className = "angel-card";

  const title = document.createElement(isBest ? "h3" : "h4");
  title.textContent = angel?.name || "Angel";
  wrap.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = angel?.description || "";
  wrap.appendChild(desc);

  return wrap;
}
```

---

✅ 정리

* 질문지는 `quiz` 시트에서 자동 불러옴
* 응답은 1\~5점으로 저장 → `score` 컬럼(G/T/A)에 따라 합산
* 최종 결과는 angels.json에서 불러와 **이름 + 설명만 표시 (이미지 없음)**
* UI 흐름은 기존 demo2와 동일

---

원하시면 제가 **angels.json도 지금 구조에 맞는 최소 샘플**을 정리해드릴까요?
