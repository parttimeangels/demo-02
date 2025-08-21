// 15문항 정의 (각 질문은 G, T, A 중 한 축에 기여)
const questions = [
  { text: "다른 사람의 감정을 잘 이해하고 공감한다.", type: "G" },
  { text: "갈등 상황에서 직접적으로 의견을 표현한다.", type: "T" },
  { text: "분위기를 조율하고 균형을 잡으려 한다.", type: "A" },
  { text: "상대방의 부탁을 잘 거절하지 못한다.", type: "G" },
  { text: "불편한 진실이라도 솔직히 말한다.", type: "T" },
  { text: "대립보다는 화해를 우선시한다.", type: "A" },
  { text: "타인의 슬픔에 쉽게 공감한다.", type: "G" },
  { text: "문제를 정면으로 맞서 해결하려 한다.", type: "T" },
  { text: "모두가 편안하도록 중간자 역할을 한다.", type: "A" },
  { text: "상대의 감정을 나의 일처럼 느낀다.", type: "G" },
  { text: "자신의 의견을 굽히지 않고 끝까지 주장한다.", type: "T" },
  { text: "갈등이 생기면 중재하려 한다.", type: "A" },
  { text: "타인의 고통을 함께 짊어진다.", type: "G" },
  { text: "위험이나 부당함에 맞서 싸운다.", type: "T" },
  { text: "서로의 입장을 이해하며 균형을 맞춘다.", type: "A" }
];

// 16개 유형 데이터 (angels.json 불러온 것과 동일)
const angels = {
  "GG": { "title": "함께 울어주는 동반자 엔젤",
    "description": "따뜻한 공감과 위로로 타인의 마음을 감싸 안을 줄 아십니다. 다만 스스로의 마음을 돌보지 못하면, 누군가에게 지나치게 의존하게 될 수도 있습니다.",
    "keywords": ["공감", "위로", "의존"],
    "growth": "스스로의 마음을 챙기며 독립적인 회복력을 기르세요."
  },
  "GT": { "title": "현실에 함께 맞서는 엔젤",
    "description": "불편한 이야기라도 회피하지 않고, 필요한 말을 분명하게 전할 줄 아십니다. 현실 감각과 추진력이 강점이지만, 때로는 직설적인 태도가 상대에게 부담이 될 수 있습니다.",
    "keywords": ["직설", "현실감각", "추진력"],
    "growth": "상대의 속도와 감정을 고려하며 조율하는 태도를 길러보세요."
  },
  "GA": { "title": "조용히 곁을 지키는 침묵의 엔젤",
    "description": "묵묵히 옆을 지켜주며 상대가 스스로 말할 수 있는 공간을 마련해 줍니다. 그러나 때로는 무심하거나 거리를 두는 사람으로 오해받을 수 있습니다.",
    "keywords": ["침묵", "존중", "여백"],
    "growth": "자신의 감정도 표현하며 균형 잡힌 교류를 시도해 보세요."
  },
  "TG": { "title": "현실을 들이대는 직설 엔젤",
    "description": "문제를 피해가지 않고 핵심을 정확히 짚어냅니다. 상대의 자기기만을 깨뜨리는 힘이 있지만, 그 직설이 차갑게 느껴질 수 있습니다.",
    "keywords": ["직설", "분석", "도전"],
    "growth": "상대의 상처를 고려하며 따뜻하게 전달하는 방식을 배워보세요."
  },
  "TT": { "title": "불굴의 맞섬 엔젤",
    "description": "강한 의지로 어려움 속에서도 굴하지 않고 나아갑니다. 그러나 지나친 완고함은 타인과의 관계를 긴장시키기도 합니다.",
    "keywords": ["투지", "저항", "의지"],
    "growth": "부드러운 타협과 협력을 통해 관계의 유연성을 키워보세요."
  },
  "TA": { "title": "현실을 감싸는 중재자 엔젤",
    "description": "갈등을 직접 직면하면서도 관계를 잇는 다리를 놓습니다. 단호함과 배려를 동시에 발휘할 수 있습니다.",
    "keywords": ["중재", "균형", "현실감각"],
    "growth": "자신의 감정 역시 소홀히 하지 않도록 주의하세요."
  },
  "AG": { "title": "따뜻한 청취자 엔젤",
    "description": "상대의 이야기를 끝까지 들어주며 공감을 나눕니다. 하지만 자신의 감정을 잘 드러내지 않아 오해를 살 수 있습니다.",
    "keywords": ["경청", "공감", "이해"],
    "growth": "자신의 속마음을 솔직히 나누는 연습이 필요합니다."
  },
  "AT": { "title": "현실을 가로막는 방패 엔젤",
    "description": "상대가 직면하기 두려운 문제 앞에 먼저 나서서 맞서줍니다. 보호적인 태도가 강점이지만, 상대를 지나치게 의존적으로 만들 수 있습니다.",
    "keywords": ["보호", "대리", "헌신"],
    "growth": "상대가 스스로 설 수 있도록 한 발 물러서는 연습이 필요합니다."
  },
  "AA": { "title": "균형을 맞추는 평화의 엔젤",
    "description": "상대의 감정과 상황을 조율하며 안정감을 줍니다. 하지만 지나치게 타협하다 보면 자기 주장을 잃을 수 있습니다.",
    "keywords": ["평화", "조율", "안정"],
    "growth": "자신의 욕구를 분명히 표현하는 법을 배워보세요."
  },
  "GTG": { "title": "현실적 공감의 엔젤",
    "description": "따뜻한 공감에 현실적인 조언을 곁들입니다. 그러나 현실감이 지나치면 위로가 부족하게 느껴질 수 있습니다.",
    "keywords": ["현실", "공감", "조언"],
    "growth": "공감과 지지를 우선시하는 태도를 잊지 마세요."
  },
  "GTA": { "title": "유연한 동행 엔젤",
    "description": "공감과 직설, 그리고 균형감을 고루 갖춘 성향으로 상황에 맞게 태도를 조정합니다. 하지만 이 과정에서 정체성이 흔들릴 수 있습니다.",
    "keywords": ["유연성", "조화", "조정"],
    "growth": "자신만의 중심을 잃지 않도록 주의하세요."
  },
  "TGA": { "title": "실천하는 돌봄 엔젤",
    "description": "현실을 직시하면서도 타인을 지키려는 따뜻함을 발휘합니다. 그러나 스스로 감당하기 벅찬 짐을 떠안기 쉽습니다.",
    "keywords": ["실천", "돌봄", "헌신"],
    "growth": "스스로 감당할 수 있는 한계를 지키는 것이 중요합니다."
  },
  "TAG": { "title": "단단한 지지대 엔젤",
    "description": "타인을 대신해 현실을 감내하며 강력한 보호자가 됩니다. 하지만 자신은 쉽게 지칠 수 있습니다.",
    "keywords": ["보호", "강인함", "책임"],
    "growth": "지속 가능한 방식으로 돌봄을 이어가는 방법을 찾으세요."
  },
  "AAG": { "title": "온화한 그림자 엔젤",
    "description": "말보다 태도로 따뜻함을 전하며 상대의 곁을 지켜줍니다. 그러나 소극적으로 보일 수 있습니다.",
    "keywords": ["온화", "그림자", "존중"],
    "growth": "적극적으로 자신을 표현하는 연습이 필요합니다."
  },
  "AAT": { "title": "화해를 이끄는 엔젤",
    "description": "갈등 상황에서 조율하며 관계의 균형을 되찾아 줍니다. 그러나 자기 감정을 억누르기 쉽습니다.",
    "keywords": ["화해", "조율", "평온"],
    "growth": "자신의 욕구를 표현하는 용기를 내야 합니다."
  },
  "ATA": { "title": "보이지 않는 보호자 엔젤",
    "description": "갈등이 격해지기 전에 상황을 조율하며 보이지 않게 타인을 보호합니다. 하지만 노력에 비해 인정받지 못할 수 있습니다.",
    "keywords": ["보호", "헌신", "숨은 노력"],
    "growth": "스스로의 가치를 인정받을 수 있는 방법을 찾아야 합니다."
  }
};

// 질문을 HTML로 렌더링
const quizForm = document.getElementById("quizForm");
questions.forEach((q, idx) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${idx+1}. ${q.text}</p>`;
  const options = document.createElement("div");
  options.className = "options";

  for (let i = 1; i <= 5; i++) {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="q${idx}" value="${i}" required> ${i}`;
    options.appendChild(label);
  }

  div.appendChild(options);
  quizForm.appendChild(div);
});

// 제출 버튼 클릭 → 결과 계산
document.getElementById("submitBtn").addEventListener("click", () => {
  let scores = { G: 0, T: 0, A: 0 };

  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (selected) {
      scores[q.type] += parseInt(selected.value);
    }
  });

  // 가장 높은 점수 2~3개 조합으로 유형 결정
  let sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  let top1 = sorted[0][0];
  let top2 = sorted[1][0];
  let top3 = sorted[2][0];

  let key = top1 + top2; // 2글자 조합
  if (scores[top3] > scores[top2] - 3) {
    key = top1 + top2 + top3; // 점수가 비슷하면 3글자 조합
  }

  let resultDiv = document.getElementById("result");
  let data = angels[key];
  if (data) {
    resultDiv.innerHTML = `
      <strong>${data.title}</strong>
      <p>${data.description}</p>
      <p><em>키워드:</em> ${data.keywords.join(", ")}</p>
      <p><em>성장 방향:</em> ${data.growth}</p>
    `;
  } else {
    resultDiv.innerHTML = "<p>결과를 찾을 수 없습니다.</p>";
  }
});
