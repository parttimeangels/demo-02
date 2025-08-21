// Google Sheets API (public JSON endpoint)
const SHEET_ID = "1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE";
const QUIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=quiz`;
const TYPE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=type`;

let quizData = [];
let typeData = {};
let scores = { G: 0, T: 0, A: 0 };

// ---------------------------
// 1. 구글시트 fetch
// ---------------------------
async function fetchSheet(url) {
  const res = await fetch(url);
  const text = await res.text();
  const json = JSON.parse(text.substr(47).slice(0, -2));
  return json.table.rows.map(r => r.c.map(c => (c ? c.v : "")));
}

// ---------------------------
// 2. 데이터 로드
// ---------------------------
async function loadData() {
  const quizRows = await fetchSheet(QUIZ_URL);
  quizData = quizRows.slice(1).map(row => ({
    id: row[0],
    question: row[1],
    options: row[2]
  }));

  const typeRows = await fetchSheet(TYPE_URL);
  typeRows.slice(1).forEach(row => {
    const no = row[0];
    const type = row[1];
    typeData[no] = type;
  });

  renderQuiz();
}

// ---------------------------
// 3. 질문 출력
// ---------------------------
function renderQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  quizData.forEach(q => {
    const div = document.createElement("div");
    div.classList.add("question");

    div.innerHTML = `
      <p>${q.id}. ${q.question}</p>
      <select id="q${q.id}">
        <option value="">선택하세요</option>
        <option value="2">매우 그렇다</option>
        <option value="1">그렇다</option>
        <option value="0">아니다</option>
      </select>
    `;

    container.appendChild(div);
  });

  const btn = document.createElement("button");
  btn.innerText = "제출하기";
  btn.onclick = calculateScore;
  container.appendChild(btn);
}

// ---------------------------
// 4. 점수 계산
// ---------------------------
function calculateScore() {
  scores = { G: 0, T: 0, A: 0 };

  quizData.forEach(q => {
    const val = parseInt(document.getElementById(`q${q.id}`).value || 0);
    const type = typeData[q.id];
    if (!type) return;

    if (["G", "T", "A"].includes(type)) {
      scores[type] += val;
    } else if (type.length === 2) {
      const [t1, t2] = type.split("");
      scores[t1] += val;
      scores[t2] += val;
    }
  });

  showResult();
}

// ---------------------------
// 5. 결과 출력
// ---------------------------
function showResult() {
  const total = scores.G + scores.T + scores.A;
  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h3>결과</h3>";

  if (ranking.length > 0) {
    const [topType, topScore] = ranking[0];
    const ratio = total ? ((topScore / total) * 100).toFixed(1) : 0;
    resultDiv.innerHTML += `<p class="top">당신은 ${topType} 엔젤 유형입니다! (${ratio}%)</p>`;
  }

  if (ranking.length > 1) {
    resultDiv.innerHTML += `<p class="sub">2순위: ${ranking[1][0]} (${ranking[1][1]}점)</p>`;
  }
  if (ranking.length > 2) {
    resultDiv.innerHTML += `<p class="sub">3순위: ${ranking[2][0]} (${ranking[2][1]}점)</p>`;
  }
}

// ---------------------------
// 시작
// ---------------------------
loadData();
