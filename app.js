const sheetId = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";
const apiQuiz = `https://opensheet.elk.sh/${sheetId}/quiz`;
const apiType = `https://opensheet.elk.sh/${sheetId}/type`;
const apiScore = `https://opensheet.elk.sh/${sheetId}/score`;
const apiResponse = `https://opensheet.elk.sh/${sheetId}/response`;

let questions = [];
let currentQuestion = 0;
let answers = [];

// 질문 불러오기
async function loadQuestions() {
  try {
    const res = await fetch(apiQuiz);
    const data = await res.json();

    // 시트에서 받아온 데이터를 배열에 저장
    questions = data.map(q => ({
      id: q.id,
      text: q.questions,
      options: ["전혀 아니다", "아니다", "그렇다", "매우 그렇다"] // 옵션 고정
    }));

    showQuestion();
  } catch (error) {
    console.error("질문 불러오기 실패:", error);
    document.getElementById("question").textContent = "질문을 불러오지 못했습니다.";
  }
}

// 현재 질문 표시
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("progress").textContent = `${currentQuestion + 1} / ${questions.length}`;
  document.getElementById("question").textContent = q.text;

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

// 결과 표시
function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";

  // 단순 출력 (나중에 score sheet 계산 연결 가능)
  document.getElementById("result").textContent = 
    `총 ${answers.length}개의 질문에 응답했습니다.`;
}

// 실행
loadQuestions();
