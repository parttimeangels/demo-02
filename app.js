// app.js

// 질문 정의
const questions = [
  "나는 다른 사람의 감정을 쉽게 공감한다.",
  "나는 불편한 진실이라도 솔직하게 말하는 편이다.",
  "나는 상대방의 이야기를 묵묵히 끝까지 들어준다.",
  "나는 갈등이 생겨도 회피하지 않고 직면한다.",
  "나는 상대방을 보호하려는 태도가 강하다.",
  "나는 분위기를 조율하며 평화를 지키려 한다.",
  "나는 상대방이 스스로 말할 수 있도록 여백을 준다.",
  "나는 현실적 조언을 잘 해준다.",
  "나는 어려움 속에서도 쉽게 포기하지 않는다.",
  "나는 관계를 중재하며 다리를 놓는 편이다.",
  "나는 내 감정보다는 타인의 감정을 먼저 챙긴다.",
  "나는 내 의견을 강하게 주장한다.",
  "나는 상대방의 부담을 대신 져주려 한다.",
  "나는 갈등을 화해로 이끄는 편이다.",
  "나는 보이지 않게 남을 돕는 편이다."
];

// 성격유형 점수 초기화
let scores = {
  GG: 0, GT: 0, GA: 0,
  TG: 0, TT: 0, TA: 0,
  AG: 0, AT: 0, AA: 0,
  GTG: 0, GTA: 0, TGA: 0,
  TAG: 0, AAG: 0, AAT: 0,
  ATA: 0
};

// 질문 표시
function renderQuestions() {
  const container = document.getElementById("quiz");
  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <p>${index + 1}. ${q}</p>
      <label><input type="radio" name="q${index}" value="1"> 전혀 그렇지 않다</label>
      <label><input type="radio" name="q${index}" value="2"> 그렇지 않다</label>
      <label><input type="radio" name="q${index}" value="3"> 보통이다</label>
      <label><input type="radio" name="q${index}" value="4"> 그렇다</label>
      <label><input type="radio" name="q${index}" value="5"> 매우 그렇다</label>
    `;
    container.appendChild(div);
  });
}

// 점수 계산
function calculateResult() {
  // 초기화
  for (let key in scores) scores[key] = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      const value = parseInt(selected.value);

      // 간단히 유형별 점수 분배 (예시)
      if (index % 4 === 0) scores.GG += value;
      if (index % 4 === 1) scores.GT += value;
      if (index % 4 === 2) scores.GA += value;
      if (index % 4 === 3) scores.TG += value;
    }
  });
}

// 결과 표시
function showResult() {
  calculateResult();

  let sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  let topType = sorted[0][0];
  let secondType = sorted[1][0];
  let thirdType = sorted[2][0];

  fetch("angels.json")
    .then(response => response.json())
    .then(data => {
      let topAngel = data[topType];
      let secondAngel = data[secondType];
      let thirdAngel = data[thirdType];

      document.getElementById("result").innerHTML = `
        <h2>✨ 당신의 엔젤 유형: ${topAngel.title}</h2>
        <p>${topAngel.description}</p>
        <p><strong>키워드:</strong> ${topAngel.keywords.join(", ")}</p>
        <p><strong>성장 방향:</strong> ${topAngel.growth}</p>
        <hr>
        <h3>🔮 추천 엔젤</h3>
        <p>2순위: ${secondAngel.title}</p>
        <p>${seocndAngel.description}</p>
        <p>3순위: ${thirdAngel.title}</p>
         <p>${thirdAngel.description}</p>
      `;
    });
}

// 초기 실행
window.onload = () => {
  renderQuestions();
  document.getElementById("submitBtn").addEventListener("click", showResult);
};
