// 질문 리스트 (30문항)
const questions = [
  "누군가 힘들다고 털어놓으면, 나는 자연스럽게 들어주고 위로하려 한다.",
  "관계에서 갈등이 생기면, 상대방을 이해하려는 태도를 먼저 가진다.",
  "친밀한 관계가 불편하더라도, 상대가 외로울까 봐 곁을 지켜준다.",
  "타인의 부탁을 거절하기보다는 웬만하면 들어주려 한다.",
  "상대방이 인정해주지 않으면, 내 가치가 줄어든 것처럼 느낀다.",
  "상대가 기뻐하면 나도 덩달아 기뻐지고, 그 감정에 크게 영향을 받는다.",
  "내 감정을 드러내기보다는, 상대의 감정을 먼저 살피고 맞춘다.",
  "불공정한 상황을 보면, 불편하더라도 바로 문제를 지적한다.",
  "상대가 나를 얕잡아본다고 느끼면, 강하게 반응한다.",
  "갈등이 생겼을 때 피하기보다는, 끝까지 논리적으로 따지고 싶다.",
  "대화에서 솔직한 직언을 중요하게 생각한다.",
  "타인의 눈치를 보느니, 차라리 내 주장을 분명히 밝힌다.",
  "상황을 주도하지 못하면 답답해지고 불안하다.",
  "내가 옳다고 확신할 때는 타협보다는 관철시키려 한다.",
  "불편한 상황에 휘말리기보다는 조용히 물러난다.",
  "갈등이 생기면, 내가 참으면 해결된다고 생각한다.",
  "모임에서 말하기보다는 듣는 편이 더 편하다.",
  "내 감정을 드러내면 오히려 불이익을 당할까 걱정된다.",
  "큰 소란이나 다툼보다는 차라리 거리를 두는 게 낫다.",
  "상처받을 위험이 보이면, 관계를 깊게 맺지 않는다.",
  "피곤한 상황이 되면 스스로 단절하고 혼자 시간을 갖는다.",
  "상대가 나에게 무리한 요구를 하면, 한 번은 들어주지만 반복되면 단호히 거절한다.",
  "소중한 사람과의 관계에서는 갈등을 회피하지 않고 맞서 해결하려 한다.",
  "평소에는 다정하지만, 신뢰를 깨뜨리면 강하게 대립한다.",
  "갈등을 피하고 싶지만, 관계가 소중하면 억지로라도 붙잡으려 한다.",
  "거절하지 못하고 받아주다가, 결국 지쳐 혼자 거리를 둔다.",
  "겉으로는 잘 맞춰주지만, 속으로는 혼자 감정을 삼키며 멀어진다.",
  "겉으로는 물러서는 척하지만, 속으로는 불만을 쌓아두며 날카롭게 관찰한다.",
  "공개적으로는 피하지만, 뒤에서 차갑게 단절해버린다.",
  "논쟁에서는 한발 빼지만, 마음속에서는 강한 반감을 오래 간직한다."
];

// 문항 → 성향 매핑
const mapping = {
  1:"G",2:"G",3:"G",4:"G",5:"G",6:"G",7:"G",
  8:"T",9:"T",10:"T",11:"T",12:"T",13:"T",14:"T",
  15:"A",16:"A",17:"A",18:"A",19:"A",20:"A",21:"A",
  22:"GT",23:"GT",24:"GT",
  25:"GA",26:"GA",27:"GA",
  28:"TA",29:"TA",30:"TA"
};

// 질문 출력
const questionContainer = document.getElementById("questions");
questions.forEach((q, i) => {
  let html = `<div class="question">
    <p><b>${i+1}. ${q}</b></p>
    <label><input type="radio" name="q${i+1}" value="1"> 전혀 그렇지 않다</label>
    <label><input type="radio" name="q${i+1}" value="2"> 그렇지 않다</label>
    <label><input type="radio" name="q${i+1}" value="3"> 보통이다</label>
    <label><input type="radio" name="q${i+1}" value="4"> 그렇다</label>
    <label><input type="radio" name="q${i+1}" value="5"> 매우 그렇다</label>
  </div>`;
  questionContainer.innerHTML += html;
});

// 결과 계산
function calculateResult() {
  const answers = document.querySelectorAll("input[type=radio]:checked");
  if (answers.length < questions.length) {
    alert("모든 문항에 응답해주세요.");
    return;
  }

  let scores = { G: 0, T: 0, A: 0 };

  answers.forEach(ans => {
    const qNum = parseInt(ans.name.replace("q", ""));
    const value = parseInt(ans.value);
    let type = mapping[qNum];

    if (type.length === 1) {
      scores[type] += value;
    } else if (type.length === 2) {
      scores[type[0]] += value/2;
      scores[type[1]] += value/2;
    }
  });

  const g = scores.G, t = scores.T, a = scores.A;
  let resultType = "";

  const max = Math.max(g,t,a);
  const min = Math.min(g,t,a);

  // 단일 우세
  if ((max - min) / max > 0.2) {
    if (max === g) resultType = "GG";
    else if (max === t) resultType = "TT";
    else resultType = "AA";
  }
  // 두 개 우세
  else if (Math.abs(g - t) < 5 && a < g*0.8) {
    resultType = "GT";
  }
  else if (Math.abs(g - a) < 5 && t < g*0.8) {
    resultType = "GA";
  }
  else if (Math.abs(t - a) < 5 && g < t*0.8) {
    resultType = "TA";
  }
  // 균형형
  else {
    resultType = "GTA";
  }

  // 결과 표시
 fetch('angels.json')
  .then(response => response.json())
  .then(data => {
    const userType = getFinalType(); // 예: "GT", "GTA" 등
    const result = data[userType];

    if (result) {
      document.getElementById('resultTitle').innerText = result.title;
      document.getElementById('resultDescription').innerText = result.description;
      document.getElementById('resultKeywords').innerText = result.keywords.join(', ');
      document.getElementById('resultGrowth').innerText = result.growth;
    } else {
      console.error("해당 유형이 angels.json에 없습니다.");
    }
  });
}
