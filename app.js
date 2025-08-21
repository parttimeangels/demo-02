const sheetId = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";
const apiQuiz = `https://opensheet.elk.sh/${sheetId}/quiz`;
const apiType = `https://opensheet.elk.sh/${sheetId}/type`;
const apiScore = `https://opensheet.elk.sh/${sheetId}/score`;

let questions = [];
let currentQuestion = 0;
let responses = [];
let typeData = [];
let scoreData = [];

// 질문 불러오기
async function loadQuestions() {
  try {
    const [quizRes, typeRes, scoreRes] = await Promise.all([
      fetch(apiQuiz),
      fetch(apiType),
      fetch(apiScore)
    ]);

    questions = await quizRes.json();
    typeData = await typeRes.json();
    scoreData = await scoreRes.json();

    if (!Array.isArray(questions)) throw new Error("질문 데이터가 배열이 아님");

    showQuestion();
  } catch (error) {
    console.error("질문 불러오기 실패:", error);
    document.getElementById("quiz-container").innerHTML =
      `<p>문항을 불러올 수 없습니다. (${error.message})</p>`;
  }
}

// 질문 표시
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("progress").textContent = `${currentQuestion + 1} / ${questions.length}`;
  document.getElementById("question").textContent = `${q.id}. ${q.question}`;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  [q.option1, q.option2, q.option3, q.option4].forEach((opt, idx) => {
    if (opt) {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.onclick = () => {
        responses.push({ id: q.id, answer: idx + 1 });
        currentQuestion++;
        showQuestion();
      };
      optionsContainer.appendChild(btn);
    }
  });
}

// 결과 계산
function showResult() {
  // 각 유형 점수 초기화
  let resultScores = {};
  scoreData.forEach(row => {
    resultScores[row.type] = 0;
  });

  // 응답 합산
  responses.forEach(r => {
    const scoreRow = scoreData.find(s => s.qid === r.id && s.answer == r.answer);
    if (scoreRow) {
      resultScores[scoreRow.type] += parseInt(scoreRow.score);
    }
  });

  // 최고 점수 유형 찾기
  let bestType = Object.keys(resultScores).reduce((a, b) =>
    resultScores[a] > resultScores[b] ? a : b
  );

  // 유형 설명 가져오기
  const typeInfo = typeData.find(t => t.type === bestType);

  document.getElementById("quiz-container").innerHTML = `
    <h2>테스트 결과</h2>
    <h3>✨ 당신은 <span style="color:#007bff">${typeInfo?.name || bestType}</span> 입니다 ✨</h3>
    <p>${typeInfo?.description || ""}</p>
    <hr/>
    <h4>선택 요약</h4>
    <pre>${JSON.stringify(responses, null, 2)}</pre>
  `;
}

loadQuestions();
