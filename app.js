// 질문 목록 (15개 예시)
const questions = [
  { text: "나는 다른 사람의 슬픔을 보면 쉽게 눈물이 난다.", dimension: "G" },
  { text: "나는 불편한 이야기도 피하지 않고 말할 수 있다.", dimension: "T" },
  { text: "나는 상대가 스스로 말할 수 있도록 기다려준다.", dimension: "A" },
  { text: "나는 현실적인 조언을 잘 해준다.", dimension: "T" },
  { text: "나는 조용히 곁을 지켜주는 편이다.", dimension: "A" },
  { text: "나는 직설적으로 상대의 문제를 짚어준다.", dimension: "T" },
  { text: "나는 공감하고 위로하는 말을 자주 한다.", dimension: "G" },
  { text: "나는 갈등을 중재하는 편이다.", dimension: "A" },
  { text: "나는 상대방이 피하는 문제를 대신 직면해 준다.", dimension: "T" },
  { text: "나는 사람들에게 안정감을 준다는 말을 듣는다.", dimension: "A" },
  { text: "나는 강한 의지로 어려움을 이겨낸다.", dimension: "T" },
  { text: "나는 나보다 타인을 우선시하는 경우가 많다.", dimension: "G" },
  { text: "나는 대립보다 평화를 중시한다.", dimension: "A" },
  { text: "나는 때로 상대방 대신 짐을 떠맡기도 한다.", dimension: "G" },
  { text: "나는 상황에 따라 유연하게 태도를 바꿀 수 있다.", dimension: "A" }
];

// 엔젤 유형 데이터 (예시: angels.json 일부)
const angels = {
  "GG": {
    title: "함께 울어주는 동반자 엔젤",
    description: "따뜻한 공감과 위로로 타인의 마음을 감싸 안을 줄 아십니다. 다만 스스로의 마음을 돌보지 못하면, 누군가에게 지나치게 의존하게 될 수도 있습니다."
  },
  "TT": {
    title: "불굴의 맞섬 엔젤",
    description: "강한 의지로 어려움 속에서도 굴하지 않고 나아갑니다. 그러나 지나친 완고함은 타인과의 관계를 긴장시키기도 합니다."
  },
  "AA": {
    title: "균형을 맞추는 평화의 엔젤",
    description: "상대의 감정과 상황을 조율하며 안정감을 줍니다. 하지만 지나치게 타협하다 보면 자기 주장을 잃을 수 있습니다."
  },
  "GT": {
    title: "현실에 함께 맞서는 엔젤",
    description: "불편한 이야기라도 회피하지 않고, 필요한 말을 분명하게 전할 줄 아십니다."
  },
  "GA": {
    title: "조용히 곁을 지키는 침묵의 엔젤",
    description: "묵묵히 옆을 지켜주며 상대가 스스로 말할 수 있는 공간을 마련해 줍니다."
  }
  // … (나머지 유형도 angels.json에 추가 가능)
};

// 질문 렌더링
function renderQuestions() {
  const form = document.getElementById("quizForm");
  form.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-block");
    div.innerHTML = `
      <p>${index + 1}. ${q.text}</p>
      <label><input type="radio" name="${q.dimension}_${index}" value="1" required> 전혀 그렇지 않다</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="2"> 그렇지 않다</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="3"> 보통이다</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="4"> 그렇다</label>
      <label><input type="radio" name="${q.dimension}_${index}" value="5"> 매우 그렇다</label>
    `;
    form.appendChild(div);
  });
}

// 결과 계산
function calculateResult() {
  const form = document.getElementById("quizForm");
  const formData = new FormData(form);

  // 기본 점수 구조
  let scores = { G: 0, T: 0, A: 0 };

  // 점수 합산
  for (let [key, value] of formData.entries()) {
    const dimension = key.split("_")[0];
    scores[dimension] += parseInt(value);
  }

  // 점수 정렬
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  // 1위, 2위, 3위 추출
  const first = sorted[0][0];
  const second = sorted[1][0];
  const third = sorted[2][0];

  // 단일 조합 (예: GG, TT, AA 등)
  const bestType = first + first;
  const secondType = second + second;
  const thirdType = third + third;

  // 결과 출력
  let html = `<h2>당신의 엔젤 유형: ${angels[bestType]?.title || bestType}</h2>`;
  html += `<p>${angels[bestType]?.description || "설명이 준비되지 않았습니다."}</p>`;

  html += `<h3>추천 엔젤 유형</h3>`;
  html += `<ul>
    <li>${angels[secondType]?.title || secondType} – ${angels[secondType]?.description || ""}</li>
    <li>${angels[thirdType]?.title || thirdType} – ${angels[thirdType]?.description || ""}</li>
  </ul>`;

  document.getElementById("result").innerHTML = html;
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  document.getElementById("submitBtn").addEventListener("click", calculateResult);
});
