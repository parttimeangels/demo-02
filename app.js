let questions = [];
let currentQuestionIndex = 0;
let answers = [];

// ✅ 구글 시트에서 데이터 불러오기
async function loadQuestions() {
  const sheetId = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";
  const sheetName = "Sheet1"; // 시트 이름 확인 필요
  const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 시트에서 {question, option1, option2, option3, option4} 형식으로 들어온다고 가정
    questions = data.map(row => ({
      question: row.question,
      options: [row.option1, row.option2, row.option3, row.option4]
    }));

    showQuestion();
  } catch (error) {
    console.error("❌ 질문 불러오기 실패:", error);
    document.getElementById("question").textContent = "질문을 불러올 수 없습니다.";
  }
}

// ✅ 질문 출력 함수
function showQuestion() {
  const currentQ = questions[currentQuestionIndex];

  // 질문 번호 progress
  document.getElementById("progress").textContent =
    `${currentQuestionIndex + 1}/${questions.length}`;

  // 질문 텍스트
  document.getElementById("question").textContent = currentQ.question;

  // 보기 버튼 생성
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  currentQ.options.forEach((opt, i) => {
    if (opt) {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(i));
      optionsDiv.appendChild(btn);
    }
  });
}

// ✅ 답변 처리
function handleAnswer(optionIndex) {
  answers.push(optionIndex);
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ✅ 결과 출력 (엔젤 추천)
function showResult() {
  document.getElementById("progress").textContent = "";
  document.getElementById("question").textContent = "테스트 완료!";
  document.getElementById("options").innerHTML = "<p>결과 계산 중...</p>";

  // 👉 여기에 angels.json 연동 or 추천 로직 추가
}

// ✅ 초기 실행
loadQuestions();
