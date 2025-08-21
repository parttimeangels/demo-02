// 질문 배열 (각 문항을 문자열로 저장)
const questions = [
  "나는 다른 사람의 부탁을 잘 들어주는 편이다.",
  "불편한 이야기도 직설적으로 말하는 편이다.",
  "상대방이 말하지 않아도 감정을 눈치챈다.",
  "갈등 상황에서 중재하려는 태도가 많다.",
  "다른 사람의 고민을 끝까지 들어줄 수 있다.",
  "상대가 힘들어할 때 대신 앞에 나서는 편이다.",
  "나는 관계 속에서 안정감을 주려 한다.",
  "상대가 회피하는 문제라도 직면하게 돕는다.",
  "상대방이 기대는 것을 부담스럽게 느낀다.",
  "나는 내 의견을 강하게 주장하는 편이다.",
  "침묵 속에서도 상대에게 지지를 줄 수 있다.",
  "타협을 통해 갈등을 줄이는 편이다.",
  "상대가 두려워하는 문제 앞에 방패가 되어준다.",
  "나는 상대방의 자기기만을 꿰뚫어본다.",
  "상대의 속도에 맞추어 조율하려고 한다."
];

// 성격유형 키 (16개 유형 중 점수 계산용)
const types = [
  "GG","GT","GA","TG","TT","TA","AG","AT","AA",
  "GTG","GTA","TGA","TAG","AAG","AAT","ATA"
];

// 점수 저장
let scores = {};
types.forEach(t => scores[t] = 0);

// 질문 출력
function renderQuiz() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";
    qDiv.innerHTML = `<p>${index + 1}. ${q}</p>`;

    // 라디오 버튼 5개 (전혀그렇지 않다 ~ 매우 그렇다)
    for (let i = 1; i <= 5; i++) {
      const labelText = ["전혀 그렇지 않다","그렇지 않다","보통이다","그렇다","매우 그렇다"][i-1];
      qDiv.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}"> ${labelText}
        </label>
      `;
    }

    quizDiv.appendChild(qDiv);
  });

  // 결과보기 버튼 추가
  const btn = document.createElement("button");
  btn.textContent = "결과 보기";
  btn.onclick = calculateResult;
  quizDiv.appendChild(btn);
}

// 결과 계산
function calculateResult() {
  // 점수 초기화
  types.forEach(t => scores[t] = 0);

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      const value = parseInt(selected.value);

      // 단순 예시: 질문 번호별로 임의 유형에 점수 반영
      // (실제 로직은 매핑 구조에 맞게 조정)
      if (index % 4 === 0) scores["GG"] += value;
      if (index % 4 === 1) scores["GT"] += value;
      if (index % 4 === 2) scores["AA"] += value;
      if (index % 4 === 3) scores["TT"] += value;
    }
  });

  // 점수 정렬
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  // 상위 1~3순위
  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  // angels.json 불러오기
  fetch("angels.json")
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `
        <h2>당신의 엔젤 유형은?</h2>
        <h3>${data[top1[0]].title}</h3>
        <p>${data[top1[0]].description}</p>
        <p><b>키워드:</b> ${data[top1[0]].keywords.join(", ")}</p>
        <p><b>성장 방향:</b> ${data[top1[0]].growth}</p>
        <hr>
        <h3>추천 엔젤</h3>
        <p>2순위: ${data[top2[0]].title}</p>
        <p>3순위: ${data[top3[0]].title}</p>
      `;
    });
}

// 실행
window.onload = renderQuiz;
