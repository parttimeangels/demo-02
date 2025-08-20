let quizData = [];
let angelsData = [];
let currentQuestion = 0;
let answers = [];

// 구글시트 / JSON 불러오기
async function loadData() {
  const quizUrl = "https://docs.google.com/spreadsheets/d/1GjR7GyIU9HdQmBirIEfjGNN1UpesJLoqp8kPwmrn1NE/gviz/tq?tqx=out:json&sheet=quiz";
  const angelsUrl = "./angels.json";

  try {
    const quizRes = await fetch(quizUrl);
    const quizText = await quizRes.text();
    const quizJson = JSON.parse(quizText.substring(47).slice(0, -2));
    quizData = quizJson.table.rows.map(r => ({
      no: r.c[0]?.v,
      quiz: r.c[1]?.v,
      type: r.c[2]?.v
    }));

    const angelsRes = await fetch(angelsUrl);
    angelsData = await angelsRes.json();

    showQuestion();
  } catch (err) {
    console.error("데이터 로드 오류:", err);
  }
}

function showQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question-box").innerText = `${q.no}. ${q.quiz}`;
  document.getElementById("options").innerHTML = `
    <label><input type="radio" name="answer" value="1"> 전혀 그렇지 않다</label><br/>
    <label><input type="radio" name="answer" value="2"> 그렇지 않다</label><br/>
    <label><input type="radio" name="answer" value="3"> 보통이다</label><br/>
    <label><input type="radio" name="answer" value="4"> 그렇다</label><br/>
    <label><input type="radio" name="answer" value="5"> 매우 그렇다</label>
  `;
  document.getElementById("nextBtn").disabled = true;

  document.querySelectorAll("input[name=answer]").forEach(input => {
    input.addEventListener("change", () => {
      answers[currentQuestion] = { type: q.type, value: Number(input.value) };
      document.getElementById("nextBtn").disabled = false;
    });
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    calculateResult();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

document.getElementById("restartBtn").addEventListener("click", () => {
  currentQuestion = 0;
  answers = [];
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
});

// ----------------------------
// 정밀 16유형 점수 계산
// ----------------------------
function calculateResult() {
  let scores = { G: 0, T: 0, A: 0 };
  let counts = { G: 0, T: 0, A: 0 };

  // 응답 합산 & 문항수 카운트
  answers.forEach(ans => {
    if (ans && ans.type) {
      scores[ans.type] += ans.value;
      counts[ans.type]++;
    }
  });

  // 평균 계산
  const avg = {
    G: counts.G ? scores.G / counts.G : 0,
    T: counts.T ? scores.T / counts.T : 0,
    A: counts.A ? scores.A / counts.A : 0
  };

  // 축별 유형
  const gType = avg.G >= 3.0 ? "G1" : "G2";
  const tType = avg.T >= 3.0 ? "T1" : "T2";
  const aType = avg.A >= 3.0 ? "A1" : "A2";

  // 2축 조합
  const gtAvg = (scores.G + scores.T) / (counts.G + counts.T);
  const gaAvg = (scores.G + scores.A) / (counts.G + counts.A);
  const taAvg = (scores.T + scores.A) / (counts.T + counts.A);

  const gtType = gtAvg >= 3.0 ? "GT1" : "GT2";
  const gaType = gaAvg >= 3.0 ? "GA1" : "GA2";
  const taType = taAvg >= 3.0 ? "TA1" : "TA2";

  // 3축 통합 (GTA)
  const totalAvg = (scores.G + scores.T + scores.A) / (counts.G + counts.T + counts.A);
  let gtaType;
  if (totalAvg < 2.0) gtaType = "GTA1";
  else if (totalAvg < 3.0) gtaType = "GTA2";
  else if (totalAvg < 3.7) gtaType = "GTA3";
  else gtaType = "GTA4";

  // --------------------------
  // 최종 결과
  // --------------------------
  const bestMatch = findAngel(gtaType);
  const otherMatches = [
    findAngel(gType),
    findAngel(tType),
    findAngel(aType),
    findAngel(gtType),
    findAngel(gaType),
    findAngel(taType)
  ].filter(Boolean);

  showResult(bestMatch, otherMatches);
}

function findAngel(type) {
  return angelsData.find(a => a.type === type);
}

function showResult(best, others) {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("best-match").innerHTML = `
    <h3>${best.name}</h3>
    <p>${best.description}</p>
  `;

  document.getElementById("other-matches").innerHTML = others.map(o => `
    <div class="other">
      <strong>${o.name}</strong><br/>
      <span>${o.description}</span>
    </div>
  `).join("");
}

// 시작
loadData();
