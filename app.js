let currentQuestion = 0;
let answers = [];
let angelsData = {};

document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const nextButton = document.getElementById("next-btn");
  const prevButton = document.getElementById("prev-btn");
  const resultContainer = document.getElementById("result-container");
  const headerTitle = document.getElementById("header-title");

  // 헤더 타이틀 표시
  headerTitle.innerText = "나의 파트타임엔젤 유형은?";

  // JSON 데이터 불러오기
  fetch("angels.json")
    .then((response) => response.json())
    .then((data) => {
      angelsData = data;
      showQuestion();
    });

  function showQuestion() {
    const questions = document.querySelectorAll(".question");
    questions.forEach((q, index) => {
      q.style.display = index === currentQuestion ? "block" : "none";
    });

    prevButton.style.display = currentQuestion > 0 ? "inline-block" : "none";
    nextButton.innerText =
      currentQuestion === questions.length - 1 ? "결과 보기" : "다음";
    nextButton.disabled = !answers[currentQuestion];
  }

  // 답변 선택
  window.selectOption = function (option, event) {
    answers[currentQuestion] = option;

    // 버튼 색상 반영
    const options = document.querySelectorAll(
      `#question-${currentQuestion} .option-btn`
    );
    options.forEach((btn) => btn.classList.remove("selected"));
    event.target.classList.add("selected");

    // 다음 버튼 활성화
    document.getElementById("next-btn").disabled = false;
  };

  // 다음 버튼
  nextButton.addEventListener("click", () => {
    const questions = document.querySelectorAll(".question");
    if (!answers[currentQuestion]) return; // 답변 없으면 이동 불가

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
    } else {
      calculateResult();
    }
  });

  // 이전 버튼
  prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion();
    }
  });

  // 결과 계산
  function calculateResult() {
    let scores = {};
    answers.forEach((answer) => {
      scores[answer] = (scores[answer] || 0) + 1;
    });

    // 점수순 정렬
    let sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    // 최고 점수 유형 + 2,3위
    let topThree = sorted.slice(0, 3);

    // 결과 출력
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    prevButton.style.display = "none";

    resultContainer.innerHTML = "<h2>✨ 나의 엔젤 유형 결과 ✨</h2>";

    topThree.forEach((type, index) => {
      if (angelsData[type]) {
        let angel = angelsData[type];

        if (index === 0) {
          // 최고 점수 유형
          resultContainer.innerHTML += `
            <div class="result-block main-result">
              <h3>🌟 최고 점수 유형: ${angel.title}</h3>
              <p>${angel.description}</p>
              <p><strong>키워드:</strong> ${angel.keywords.join(", ")}</p>
              <p><strong>성장 방향:</strong> ${angel.growth}</p>
            </div>
          `;
        } else {
          // 2, 3순위 (작은 글씨)
          resultContainer.innerHTML += `
            <div class="result-block sub-result">
              <h4>${index + 1}순위: ${angel.title}</h4>
              <p>${angel.description}</p>
              <p><em>키워드:</em> ${angel.keywords.join(", ")}</p>
              <p><em>성장 방향:</em> ${angel.growth}</p>
            </div>
          `;
        }
      }
    });
  }
});
