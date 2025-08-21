document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");
  const submitBtn = document.getElementById("submit");

  // 15개 문항 (예시, 실제 질문으로 교체 가능)
  const questions = [
    { q: "상대가 부탁을 하면, 거절하기 어렵다.", type: "G" },
    { q: "불편한 진실도 반드시 말해야 한다고 생각한다.", type: "T" },
    { q: "다른 사람의 감정을 먼저 살핀다.", type: "G" },
    { q: "갈등이 생기면 피하기보다는 맞선다.", type: "T" },
    { q: "상대가 말할 때 조용히 들어주는 편이다.", type: "A" },
    { q: "상대방이 기대면 나도 쉽게 의존하게 된다.", type: "G" },
    { q: "불공정한 상황에선 직설적으로 반응한다.", type: "T" },
    { q: "분위기가 깨지지 않도록 중재하려 한다.", type: "A" },
    { q: "누군가의 슬픔을 함께 울어줄 수 있다.", type: "G" },
    { q: "타인의 자기기만을 지적하는 게 필요하다.", type: "T" },
    { q: "다툼을 피하려고 스스로 감정을 억누른다.", type: "A" },
    { q: "상대의 고통을 대신 감당하고 싶다.", type: "G" },
    { q: "갈등 속에서도 끝까지 밀어붙인다.", type: "T" },
    { q: "눈에 띄지 않게 뒤에서 지지하는 편이다.", type: "A" },
    { q: "상황에 따라 공감·직설·조율을 오가며 대응한다.", type: "GTA" }
  ];

  // 질문 렌더링
  questions.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <p>${index + 1}. ${item.q}</p>
      <label><input type="radio" name="q${index}" value="1"> 그렇다</label>
      <label><input type="radio" name="q${index}" value="0"> 아니다</label>
    `;
    quizContainer.appendChild(div);
  });

  submitBtn.addEventListener("click", () => {
    let scores = { G: 0, T: 0, A: 0 };

    questions.forEach((item, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === "1") {
        if (item.type === "GTA") {
          scores.G++;
          scores.T++;
          scores.A++;
        } else {
          scores[item.type]++;
        }
      }
    });

    // 최종 결과 도출
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [top1, top2, top3] = sorted;

    let resultKey = "";
    if (top1[1] > top2[1]) {
      resultKey = top1[0] + top1[0]; // GG, TT, AA
    } else if (top1[1] === top2[1] && top1[1] > top3[1]) {
      resultKey = top1[0] + top2[0]; // GT, GA, TA
    } else {
      resultKey = "GTA"; // 균형
    }

    fetch("angels.json")
      .then(res => res.json())
      .then(data => {
        const angel = data[resultKey];
        resultContainer.innerHTML = `
          <h2>당신의 엔젤 유형은 <strong>${angel.title}</strong></h2>
          <p>${angel.description}</p>
          <p><strong>키워드:</strong> ${angel.keywords.join(", ")}</p>
          <p><strong>성장 방향:</strong> ${angel.growth}</p>
        `;
      });
  });
});
