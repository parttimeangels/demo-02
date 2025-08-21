// app.js

// 1. 질문 리스트 정의 (dimension은 G, T, A 중 하나)
const questions = [
  { text: "나는 다른 사람의 감정을 잘 알아차리고 공감한다.", dimension: "G" },
  { text: "불편한 상황에서도 필요한 말을 분명하게 한다.", dimension: "T" },
  { text: "갈등이 생기면 조용히 물러나거나 상황을 지켜본다.", dimension: "A" },
  { text: "상대방이 힘들어할 때 함께 울어주며 위로한다.", dimension: "G" },
  { text: "문제 상황에서는 정면으로 맞서는 편이다.", dimension: "T" },
  { text: "다툼이 생기면 중재자 역할을 하려고 한다.", dimension: "A" },
  { text: "나는 누군가의 마음을 끝까지 들어주는 편이다.", dimension: "G" },
  { text: "현실적인 조언을 아끼지 않고 건넨다.", dimension: "T" },
  { text: "상대가 나를 힘들게 해도 갈등을 피하려 한다.", dimension: "A" },
  { text: "타인의 고통을 보면 내 일처럼 마음이 아프다.", dimension: "G" },
  { text: "불의한 상황을 보면 그냥 넘어가지 않는다.", dimension: "T" },
  { text: "분위기를 깨지 않으려 내 의견을 감춘다.", dimension: "A" },
  { text: "나는 상대방에게 보호자처럼 행동하는 편이다.", dimension: "G" },
  { text: "상대방의 자기기만을 그대로 두지 않고 지적한다.", dimension: "T" },
  { text: "내가 상처받더라도 상대와의 평화를 우선시한다.", dimension: "A" }
];

// 2. 질문 렌더링
function renderQuestions() {
  const form = document.getElementById("quizForm");
  form.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");
    div.innerHTML = `
      <p>${index + 1}. ${q.text}</p>
      <label><input type="radio" name="${q.dimension}_${index}" value="1" required> 전혀 그렇지 않다 (1점)</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="2"> 그렇지 않다 (2점)</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="3"> 보통이다 (3점)</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="4"> 그렇다 (4점)</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="5"> 매우 그렇다 (5점)</label>
    `;
    form.appendChild(div);
  });

  // 제출 버튼 추가
  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerText = "결과 보기";
  btn.onclick = calculateResult;
  form.appendChild(btn);
}

// 3. 결과 계산
async function calculateResult() {
  // 1) angels.json 불러오기
  const response = await fetch("data/angels.json");
  const angels = await response.json();

  // 2) 점수 합산
  const form = document.getElementById("quizForm");
  const data = new FormData(form);
  let scores = { G: 0, T: 0, A: 0 };

  data.forEach((value, key) => {
    const [dimension] = key.split("_");
    scores[dimension] += parseInt(value, 10);
  });

  // 3) 유형 점수 계산 (간단 버전)
  let combos = {
    GG: scores.G * 2,
    TT: scores.T * 2,
    AA: scores.A * 2,
    GT: scores.G + scores.T,
    GA: scores.G + scores.A,
    TA: scores.T + scores.A,
    GTA: scores.G + scores.T + scores.A,
    GTG: scores.G * 2 + scores.T,
    TGA: scores.T * 2 + scores.A,
    TAG: scores.T + scores.A * 2,
    AAG: scores.A * 2 + scores.G,
    AAT: scores.A * 2 + scores.T,
    ATA: scores.A * 2 + scores.T
  };

  // 4) 점수순 정렬 후 TOP 2 추출
  const sorted = Object.entries(combos).sort((a, b) => b[1] - a[1]);
  const topTwo = sorted.slice(0, 2);

  // 5) 결과 표시
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h2>당신의 엔젤 유형 TOP 2</h2>
    ${topTwo.map(([type]) => `
      <div style="margin-bottom:15px;">
        <strong>${angels[type].title}</strong><br>
        ${angels[type].description}
      </div>
    `).join("")}
  `;
}

// 4. 실행
document.addEventListener("DOMContentLoaded", renderQuestions);
