const sheetId = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";

// 시트별 API 주소
const apiQuiz = `https://opensheet.elk.sh/${sheetId}/quiz`;
const apiType = `https://opensheet.elk.sh/${sheetId}/type`;
const apiScore = `https://opensheet.elk.sh/${sheetId}/score`;

let questions = [];
let currentQuestion = 0;
let answers = [];

// 질문 불러오기
async function loadQuestions() {
  try {
    const res = await fetch(apiQuiz);
    const data = await res.json();

    // 🔑 컬럼명 매칭 (id, questions)
    questions = data.map(row => ({
      id: row.id,
      text: row.questions,   // 시트 컬럼 그대로 사용
      options: ["전혀 그렇지 않다", "그렇지 않다", "그렇다", "매우 그렇다"] // 기본 4지선다
    }));

    showQuestion();
  } catch (err) {
    console.error("질문 불러오기 실패:", err);
  }
}

// 질문 보여주기
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];

  // 진행률 표시 (1/30)
  document.getElementById("progress").textContent = `${currentQuestion + 1} / ${questions.length}`;

  // 질문 번호 + 내용
  document.getElementById("question").textContent = `${q.id}. ${q.text}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => {
      answers.push({ id: q.id, answer: i + 1 });
      currentQuestion++;
      showQuestion();
    });
    optionsDiv.appendChild(btn);
  });
}

// 결과 계산 (임시)
function showResult() {
  document.getElementById("quiz-container").innerHTML = `
    <h2>결과</h2>
    <pre>${JSON.stringify(answers, null, 2)}</pre>
  `;
}

// 실행
loadQuestions();
