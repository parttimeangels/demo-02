document.addEventListener("DOMContentLoaded", () => {
  let currentQuestion = 0;
  let answers = [];

  const questionText = document.getElementById("question-text");
  const choicesContainer = document.getElementById("choices");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const resultContainer = document.getElementById("result-container");
  const quizContainer = document.getElementById("question-container");
  const resultDiv = document.getElementById("result");
  const restartBtn = document.getElementById("restartBtn");
  const chartCanvas = document.getElementById("resultChart");

  let angels = {};

  // JSON 불러오기
  fetch("angels.json")
    .then(res => res.json())
    .then(data => {
      angels = data;
      loadQuestion();
    })
    .catch(err => {
      console.error("angels.json 로드 오류:", err);
    });

  function loadQuestion() {
    const questions = [
      "누군가 부탁하면 쉽게 들어주나요?",
      "갈등 상황에서 솔직히 맞서나요?",
      "문제가 생기면 피하려고 하나요?",
      "조화와 균형을 중시하나요?"
    ];

    const options = [
      ["전혀 아니다", "아니다", "그렇다", "매우 그렇다"],
      ["전혀 아니다", "아니다", "그렇다", "매우 그렇다"],
      ["전혀 아니다", "아니다", "그렇다", "매우 그렇다"],
      ["전혀 아니다", "아니다", "그렇다", "매우 그렇다"]
    ];

    if (currentQuestion >= questions.length) {
      calculateResult();
      return;
    }

    questionText.textContent = questions[currentQuestion];
    choicesContainer.innerHTML = "";

    options[currentQuestion].forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.classList.add("choice-btn");
      btn.addEventListener("click", () => {
        answers[currentQuestion] = index;
        nextBtn.disabled = false;
      });
      choicesContainer.appendChild(btn);
    });

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = !answers[currentQuestion];
  }

  function calculateResult() {
    // 간단 매핑 예시
    const sum = answers.reduce((a, b) => a + b, 0);
    const key = sum % Object.keys(angels).length;
    const angel = angels[`Angel${key + 1}`];

    if (!angel) {
      resultDiv.innerHTML = "<p>결과를 불러올 수 없습니다.</p>";
      return;
    }

    resultDiv.innerHTML = `
      <h3>${angel.title}</h3>
      <p>${angel.description}</p>
      <p><strong>키워드:</strong> ${angel.keywords}</p>
      <p><strong>성장 방향:</strong> ${angel.growth}</p>
    `;

    // 그래프
    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: ["순응", "맞섬", "회피", "균형"],
        datasets: [{
          label: "점수",
          data: [
            answers[0] || 0,
            answers[1] || 0,
            answers[2] || 0,
            answers[3] || 0
          ]
        }]
      }
    });

    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
  });

  prevBtn.addEventListener("click", () => {
    currentQuestion--;
    loadQuestion();
  });

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      currentQuestion = 0;
      answers = [];
      quizContainer.classList.remove("hidden");
      resultContainer.classList.add("hidden");
      loadQuestion();
    });
  }
});
