let angelsData = {}; // 외부 JSON 저장

// 질문 목록
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

  let scores = { G: 0, T: 0, A: 0 };

  for (let [key, value] of formData.entries()) {
    const dimension = key.split("_")[0];
    scores[dimension] += parseInt(value);
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const first = sorted[0][0];
  const second = sorted[1][0];
  const third = sorted[2][0];

  const bestType = first + first;
  const secondType = second + second;
  const thirdType = third + third;

  let html = `<h2>당신의 엔젤 유형: ${angelsData[bestType]?.title || bestType}</h2>`;
  html += `<p>${angelsData[bestType]?.description || ""}</p>`;

  html += `<h3>추천 엔젤 유형</h3>`;
  html += `<ul>
    <li>${angelsData[secondType]?.title || secondType} – ${angelsData[secondType]?.description || ""}</li>
    <li>${angelsData[thirdType]?.title || thirdType} – ${angelsData[thirdType]?.description || ""}</li>
  </ul>`;

  document.getElementById("result").innerHTML = html;
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();

  // JSON 불러오기
  fetch("angels.json")
    .then(res => res.json())
    .then(data => {
      angelsData = data;
    })
    .catch(err => console.error("angels.json 불러오기 실패:", err));

  document.getElementById("submitBtn").addEventListener("click", calculateResult);
});
