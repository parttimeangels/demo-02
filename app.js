/* app.js — DOM API만 사용 (innerHTML/백틱 미사용) */
console.log("[app.js] 로드 OK");

// ===== 설정 =====
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbx2pBnha3LyPzlzklccW8JKDa-0TA_46L7lOE9g3F7gNbsaYOKau9qWOHjicsMX-kzNNQ/exec";
const ANGELS_SRC = "angels.json";

// ===== 데이터 =====
const questions = [
  {
    question: "만약 인간관계의 의미를 정의해야 한다면, 나는…",
    options: ["인생의 전부라고 생각한다.", "나를 성장시키는 활력소라고 생각한다.", "버거운 짐이라고 생각한다.", "때론 즐겁지만, 때론 힘들기도 하다."]
  },
  {
    question: "만약 처음 보는 사람과 마주한다면, 나는…",
    options: ["다정하게 웃으며 호감을 얻는다.", "먼저 말을 걸며 분위기를 주도한다.", "눈을 피하고 아무 말도 하지 않는다.", "상황에 따라 반응이 달라진다."]
  },
  {
    question: "만약 하루를 마무리할 때 가장 편한 순간을 고른다면…",
    options: ["가까운 사람과 대화할 때", "성취를 확인하는 순간", "혼자만의 시간", "그날 기분에 따라 다르다."]
  },
  {
    question: "만약 누군가가 내 의견을 거절한다면, 나는…",
    options: ["내가 잘못했나 고민한다.", "왜 틀렸는지 따진다.", "아무 말도 하지 않는다.", "상대와 상황을 보고 태도를 조절한다."]
  },
  {
    question: "만약 내가 원하는 관계의 모습을 묘사해야 한다면…",
    options: ["늘 곁에서 따뜻하게 지켜주는 관계", "서로 자극하며 성장하는 관계", "서로 간섭하지 않는 자유로운 관계", "균형 잡힌 관계가 가장 좋다."]
  },
  {
    question: "만약 모임 자리에서 내 의견이 무시된다면, 나는…",
    options: ["내가 부족했나 생각한다.", "다시 강조하며 관철한다.", "아무 말도 하지 않고 가만히 있는다.", "분위기를 보며 적절히 넘어간다."]
  },
  {
    question: "만약 누군가 억울한 상황이라며 나에게 편지를 대신 써달라고 한다면…",
    options: ["차분히 들어주며 감정을 풀어준다.", "규정과 사실을 근거로 따져 쓴다.", "필요 이상 개입은 하지 않고 최소한만 돕는다.", "도와주되 선을 지킨다."]
  },
  {
    question: "만약 누군가가 “현실 진단이 필요하다”고 나에게 요청한다면…",
    options: ["위로의 말부터 건넨다.", "냉정하게 문제와 해결책을 짚는다.", "감정은 배제하고 자료·정보로만 대응한다.", "위로와 현실 사이에서 균형을 잡으려 한다."]
  },
  {
    question: "만약 밤늦게 갑자기 전화가 걸려와 “지금 당장 얘기 좀 해달라”고 한다면…",
    options: ["피곤해도 들어주며 같이 공감한다.", "상황을 정리하며 차분히 듣는다.", "늦은 시간이라 전화를 받지 않는다.", "짧게 응대한 뒤 다음 날 이어서 들어준다."]
  },
  {
    question: "만약 친구가 큰 실수를 하고 나에게 도움을 청한다면…",
    options: ["밤새 곁에서 위로한다.", "잘못은 잘못이라고 직설적으로 말한다.", "직접 위로 대신, 관련 방법이나 자료를 찾아준다.", "위로와 조언을 적당히 섞어 건넨다."]
  },
  {
    question: "만약 반려동물이 아픈 가족이 “하루 종일 지켜봐 달라”고 한다면…",
    options: ["정성껏 지켜보며 위로한다.", "치료 과정의 현실을 분명히 설명한다.", "말은 적게 하고 묵묵히 곁을 지킨다.", "일정 부분만 맡고, 나머지는 함께 분담하자고 제안한다."]
  },
  {
    question: "만약 가까운 사람이 울면서 “해답은 필요 없어, 그냥 있어 달라”고 한다면…",
    options: ["함께 울며 곁을 지킨다.", "울음보다 문제 해결이 먼저라고 말한다.", "감정에 휘말리지 않고, 차라리 관련 책이나 정보를 건넨다.", "곁에 있으면서도 조용히 현실적인 도움을 생각한다."]
  },
  {
    question: "만약 중요한 사람이 마지막으로 큰 부탁을 한다면…",
    options: ["곁에서 손을 잡고 마음을 함께 나눈다.", "그 부탁은 짐을 떠넘기는 것 같아 불쾌하다.", "아무 대답도 못한 채 혼자 속으로 고심한다.", "부탁의 성격에 따라 감당 가능한 부분만 선택한다."]
  },
  {
    question: "만약 내가 가장 불안해지는 순간을 꼽는다면…",
    options: ["가까운 이들로부터 떨어져 혼자 남겨질 때", "내 노력이 무시당하거나 지는 것 같을 때", "누군가에게 얽매여 내 공간이 사라질 때", "상황에 따라 불안 요인은 달라진다."]
  },
  {
    question: "만약 내가 지켜야 할 누군가가 있다면, 나는…",
    options: ["그 사람의 감정에 함께 휘말리며 곁을 지킨다.", "그 사람을 단단하게 만들 수 있도록 현실을 들이민다.", "직접 감정에 개입하기보다, 지켜보며 필요할 때만 개입한다.", "감정과 현실 사이에서 균형을 맞추려 한다."]
  }
];
// ===== 상태 =====
let currentQuestionIndex = 0;
const userAnswers = new Array(questions.length).fill(undefined);
const $ = (id) => document.getElementById(id);


// 선택 다수결로 매칭 (미응답 제외, 동점이면 가장 최근 선택 타입 우선)
function pickMatchByMajority(angels) {
  const N = angels.length || 1;
  const scores = new Array(N).fill(0);

  // 각 문항의 선택(0~3)을 해당 엔젤(0~N-1)에 +1
  userAnswers.forEach(a => {
    if (a !== undefined) scores[a % N] += 1;
  });

  // 동점일 때 “가장 최근에 고른 타입”을 우선
  let lastPicked = 0;
  for (let i = userAnswers.length - 1; i >= 0; i--) {
    if (userAnswers[i] !== undefined) { lastPicked = userAnswers[i] % N; break; }
  }

  const order = [...scores.keys()].sort((i, j) => {
    const diff = scores[j] - scores[i];
    if (diff !== 0) return diff;
    if (i === lastPicked && j !== lastPicked) return -1;
    if (j === lastPicked && i !== lastPicked) return 1;
    return i - j; // 그래도 같으면 작은 번호 우선
  });

  const bestIndex = order[0];
  const best = angels[bestIndex] || {};
  const others = order.slice(1, 3).map(i => angels[i]).filter(Boolean);
  return { bestIndex, best, others, scores };
}

// ===== 토글 =====
function showSection(which) {
  const quiz = $("quiz");
  const result = $("result");
  if (which === "quiz") {
    quiz.classList.remove("hidden");
    result.classList.add("hidden");
  } else {
    result.classList.remove("hidden");
    quiz.classList.add("hidden");
  }
}

// ===== 질문 렌더 =====
function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }
  showSection("quiz");

  const q = questions[currentQuestionIndex];
  const questionBox = $("question-box");
  const optionsBox = $("options");
  const prevBtn = $("prevBtn");
  const nextBtn = $("nextBtn");

  // 질문 텍스트
  questionBox.textContent = q.question;

  // 기존 옵션 제거
  while (optionsBox.firstChild) optionsBox.removeChild(optionsBox.firstChild);

  // 옵션 생성
  q.options.forEach((label, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = label;

    if (userAnswers[currentQuestionIndex] === idx) {
      btn.classList.add("selected");
      nextBtn.disabled = false;
    }

    btn.addEventListener("click", () => {
      const all = optionsBox.querySelectorAll(".option");
      all.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      userAnswers[currentQuestionIndex] = idx;
      nextBtn.disabled = false;
    });

    optionsBox.appendChild(btn);
  });

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;
}

// ===== 네비게이션 =====
function bindNav() {
  $("prevBtn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  });

  $("nextBtn").addEventListener("click", () => {
    if (userAnswers[currentQuestionIndex] === undefined) return;
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      showResult();
    }
  });
}

// ===== 결과 렌더 =====
async function showResult() {
  showSection("result");

  try {
    const res = await fetch(ANGELS_SRC);
    const angels = await res.json();

    const { best, others } = pickMatchByMajority(angels);


    // 베스트 매치 카드
    renderAngelCard($("best-match"), best, true);

    // 다른 추천 2개
    const otherWrap = $("other-matches");
    while (otherWrap.firstChild) otherWrap.removeChild(otherWrap.firstChild);
    others.forEach((a) => {
      const card = buildAngelCard(a, false);
      otherWrap.appendChild(card);
    });

    // 저장 (CORS-safe)
    saveToSheet({
  answers: userAnswers,
  bestMatch: best?.name ?? null,
  timestamp: new Date().toISOString()
});
  } catch (err) {
    console.error("결과 처리 오류:", err);
    const bm = $("best-match");
    while (bm.firstChild) bm.removeChild(bm.firstChild);
    const p = document.createElement("p");
    p.textContent = "결과를 불러오는 데 문제가 발생했습니다.";
    bm.appendChild(p);
  }
}

// 카드 빌더(동일)
function buildAngelCard(angel, isBest) {
  const wrap = document.createElement("div");
  wrap.className = "angel-card";

  const title = document.createElement(isBest ? "h3" : "h4");
  title.textContent = angel && angel.name ? angel.name : "Angel";
  wrap.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = angel && angel.description ? angel.description : "";
  wrap.appendChild(desc);

  if (angel && angel.image) {
    const img = document.createElement("img");
    img.src = angel.image;
    img.alt = angel.name || "Angel";
    wrap.appendChild(img);
  }

  return wrap;
}

function renderAngelCard(container, angel, isBest) {
  while (container.firstChild) container.removeChild(container.firstChild);
  container.appendChild(buildAngelCard(angel, isBest));
}

// ===== 시트 저장 (sendBeacon → no-cors) =====
function saveToSheet(payload) {
  const data = JSON.stringify(payload);
  const blob = new Blob([data], { type: "text/plain;charset=UTF-8" });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(WEB_APP_URL, blob);
    return;
  }
  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: data
  }).catch(() => {});
}

// ===== 다시하기 =====
function bindRestart() {
  const btn = $("restartBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    for (let i = 0; i < userAnswers.length; i++) userAnswers[i] = undefined;
    showSection("quiz");
    showQuestion();
  });
}

// ===== 초기화 =====
window.addEventListener("DOMContentLoaded", () => {
  console.log("[app.js] DOMContentLoaded init");
  showSection("quiz");
  bindNav();
  bindRestart();
  showQuestion();
});