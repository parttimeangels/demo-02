document.addEventListener("DOMContentLoaded", () => {
  const sheetId = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";

  // 시트별 API 주소
  const apiQuiz = `https://opensheet.elk.sh/${sheetId}/quiz`;
  const apiType = `https://opensheet.elk.sh/${sheetId}/type`;
  const apiScore = `https://opensheet.elk.sh/${sheetId}/score`;

  let questions = [];
  let answers = [];
  let currentQuestion = 0;
  let typeTable = [];
  let scoreMap = { G: 0, T: 0, A: 0 };

  // 1️⃣ 데이터 불러오기
  Promise.all([fetch(apiQuiz), fetch(apiType), fetch(apiScore)])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([quizData, typeData, scoreData]) => {
      questions = quizData.map(row => ({
        id: row.id,
        question: row.questions,
        options: row.options
          ? JSON.parse(row.options)
          : ["전혀 아니다", "아니다", "그렇다", "매우 그렇다"]
      }));

      typeTable = typeData;

      // score 시트 → {질문id, opt번호, 성향} 구조로 변환
      // 예: { id: "1", opt1: "G", opt2: "T", opt3: "A", opt4: "G" }
      scoreTable = scoreData;

      showQuestion();
    })
    .catch(err => {
      document.getElementById("quiz").innerHTML = `<p>데이터 로딩 실패: ${err}</p>`;
    });

  // 2️⃣ 질문 출력
  function showQuestion() {
    const container = document.getElementById("quiz");

    if (currentQuestion >= questions.length) {
      finishQuiz();
      return;
    }

    const q = questions[currentQuestion];
    container.innerHTML = `
      <p class="small-text">질문 ${q.id} / ${questions.length}</p>
      <h3>${q.question}</h3>
      <div>
        ${q.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">${opt}</button>
        `).join("")}
      </div>
    `;

    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const choice = Number(e.target.dataset.index) + 1; // opt1~opt4
        answers.push({ id: q.id, choice });
        addScore(q.id, choice);
        currentQuestion++;
        showQuestion();
      });
    });
  }

  // 3️⃣ 점수 누적
  function addScore(qid, choice) {
    const row = scoreTable.find(s => s.id === qid);
    if (!row) return;

    const key = `opt${choice}`;
    const trait = row[key]; // G / T / A
    if (trait && scoreMap[trait] !== undefined) {
      scoreMap[trait] += 1; // 단순히 +1 (혹은 점수 가중치 적용 가능)
    }
  }

  // 4️⃣ 최종 결과
  function finishQuiz() {
    const container = document.getElementById("quiz");

    // 가장 높은 점수 성향 찾기
    const maxTrait = Object.keys(scoreMap).reduce((a, b) =>
      scoreMap[a] >= scoreMap[b] ? a : b
    );

    const matchedType = typeTable.find(t => t.type === maxTrait);

    container.innerHTML = `
      <h2>당신의 성향: ${maxTrait}</h2>
      <p>G=${scoreMap.G}, T=${scoreMap.T}, A=${scoreMap.A}</p>
      <h3>${matchedType?.name || ""}</h3>
      <p>${matchedType?.description || ""}</p>
    `;
  }
});
