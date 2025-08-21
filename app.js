document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");
  const questionsDiv = document.getElementById("questions");
  const resultDiv = document.getElementById("result");
  const angelTitle = document.getElementById("angelTitle");
  const angelDesc = document.getElementById("angelDesc");
  const angelKeywords = document.getElementById("angelKeywords");
  const angelGrowth = document.getElementById("angelGrowth");

  // 15개 질문 (예시)
  const questions = [
    "1. 친구가 힘든 얘기를 털어놓을 때 나는?",
    "2. 다른 사람의 부탁이 벅차게 느껴질 때 나는?",
    "3. 모임에서 갈등이 생기면 나는?",
    "4. 상대가 잘못된 선택을 하려 할 때 나는?",
    "5. 누군가 우울해 보일 때 나는?",
    "6. 중요한 결정을 내릴 때 나는?",
    "7. 친구가 나에게 기대려 할 때 나는?",
    "8. 불편한 이야기를 꺼내야 할 때 나는?",
    "9. 누군가 침묵할 때 나는?",
    "10. 주변 사람이 나를 무시하는 것 같을 때 나는?",
    "11. 상대가 감정을 숨길 때 나는?",
    "12. 상대가 나에게 의존할 때 나는?",
    "13. 문제 해결을 미루고 싶을 때 나는?",
    "14. 상대가 솔직히 다가올 때 나는?",
    "15. 내가 갈등의 중심에 설 때 나는?"
  ];

  // 4가지 답변 옵션 (점수: G / T / A 로 매핑)
  const options = [
    { text: "따뜻하게 공감한다", value: "G" },
    { text: "현실적으로 맞선다", value: "T" },
    { text: "조용히 거리를 둔다", value: "A" },
    { text: "상황에 따라 균형을 잡는다", value: "X" } // X = 중립
  ];

  // 질문 출력
  questions.forEach((q, idx) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("question");
    qDiv.innerHTML = `<p>${q}</p>`;

    options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="q${idx}" value="${opt.value}" required>
        ${opt.text}
      `;
      qDiv.appendChild(label);
    });

    questionsDiv.appendChild(qDiv);
  });

  // angels.json 불러오기
  let angelData = {};
  fetch("angels.json")
    .then(res => res.json())
    .then(data => {
      angelData = data;
    })
    .catch(err => {
      console.error("angels.json 로드 실패:", err);
    });

  // 제출 이벤트
  form.addEventListener("submit", e => {
    e.preventDefault();

    let counts = { G: 0, T: 0, A: 0 };

    questions.forEach((_, idx) => {
      const answer = form.querySelector(`input[name="q${idx}"]:checked`);
      if (answer) {
        const val = answer.value;
        if (val !== "X") counts[val]++;
      }
    });

    // 가장 높은 두 개 조합
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top2 = sorted.slice(0, 2).map(([k]) => k);

    // 키 생성 (예: "GT", "GA", "TA"...)
    let key = top2.join("");

    // 3개가 비슷하면 GTA, TGA 등 확장 가능
    if (sorted[0][1] === sorted[1][1] && sorted[1][1] === sorted[2][1]) {
      key = "GTA";
    }

    const angel = angelData[key];

    if (angel) {
      angelTitle.textContent = angel.title;
      angelDesc.textContent = angel.description;
      angelKeywords.textContent = angel.keywords.join(", ");
      angelGrowth.textContent = angel.growth;
      resultDiv.style.display = "block";
      resultDiv.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("해당 결과를 찾을 수 없습니다.");
    }
  });
});
