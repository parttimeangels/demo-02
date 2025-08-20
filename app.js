// Google Spreadsheet CSV URL
const sheetUrl = "https://docs.google.com/spreadsheets/d/1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE/export?format=csv";

let questions = [];
let currentQuestion = 0;
let answers = { G: 0, T: 0, A: 0 };

// 질문 로드
async function loadQuestions() {
  try {
    const response = await fetch(sheetUrl);
    const data = await response.text();

    const rows = data.split("\n").map(r => r.split(","));
    // 헤더 제외
    questions = rows.slice(1).map(r => ({
      text: r[0].trim(),   // 질문
      optionA: r[1]?.trim(),
      optionB: r[2]?.trim(),
      optionC: r[3]?.trim(),
      optionD: r[4]?.trim(),
      dimension: r[5]?.trim()
    }));

    startQuiz();
  } catch (err) {
    console.error("질문 로드 오류:", err);
    document.getElementById("question").textContent = "질문을 불러오지 못했습니다.";
  }
}

// 퀴즈 시작
function startQuiz() {
  currentQuestion = 0;
  showQuestion();
}

// 질문 표시
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];

  // 질문 텍스트
  document.getElementById("question").textContent = q.text;

  // 진행상황 (예: 3/30)
  document.getElementById("progress").textContent = `${currentQuestion + 1} / ${questions.length}`;

  // 보기 버튼 채우기
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  ["A", "B", "C", "D"].forEach((key, idx) => {
    if (q[`option${key}`]) {
      const btn = document.createElement("button");
      btn.textContent = q[`option${key}`];
      btn.className = "option-btn";
      btn.onclick = () => selectAnswer(key, q.dimension);
      optionsDiv.appendChild(btn);
    }
  });
}

// 답변 선택
function selectAnswer(option, dimension) {
  if (dimension && answers[dimension] !== undefined) {
    answers[dimension] += 1; // 간단히 점수 +1 (추후 가중치 반영 가능)
  }

  currentQuestion++;
  showQuestion();
}

// 결과 표시
function showResult() {
  document.getElementById("quiz-container").innerHTML = `
    <h2>결과</h2>
    <p>공감(G): ${answers.G}</p>
    <p>맞섬(T): ${answers.T}</p>
    <p>회피/균형(A): ${answers.A}</p>
  `;
}

// 페이지 로드 시 실행
window.onload = loadQuestions;
