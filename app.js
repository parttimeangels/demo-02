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

const mappings = [
  "G","G","G","G","G","G","G",
  "T","T","T","T","T","T","T",
  "A","A","A","A","A","A","A",
  "GT","GT","GT",
  "GA","GA","GA",
  "TA","TA","TA"
];

const scores = { G: 0, T: 0, A: 0 };

window.onload = () => {
  const quizDiv = document.getElementById("questions");

  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${idx + 1}. ${q}</p>
      <label><input type="radio" name="q${idx}" value="1" required> 전혀 그렇지 않다</label>
      <label><input type="radio" name="q${idx}" value="2"> 그렇지 않다</label>
      <label><input type="radio" name="q${idx}" value="3"> 보통이다</label>
      <label><input type="radio" name="q${idx}" value="4"> 그렇다</label>
      <label><input type="radio" name="q${idx}" value="5"> 매우 그렇다</label>
    `;
    quizDiv.appendChild(div);
  });

  document.getElementById("quizForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    scores.G = 0; scores.T = 0; scores.A = 0;

    questions.forEach((_, idx) => {
      const val = parseInt(document.querySelector(`input[name="q${idx}"]:checked`).value);
      const map = mappings[idx];

      if (map.length === 1) {
        scores[map] += val;
      } else {
        map.split("").forEach(k => scores[k] += val * 0.5);
      }
    });

    let sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const diff1 = sorted[0][1] - sorted[1][1];
    const diff2 = sorted[1][1] - sorted[2][1];

    let resultKey = "";
    if (diff1 >= 5) {
      resultKey = sorted[0][0] + sorted[0][0];
    } else if (diff2 <= 2) {
      resultKey = sorted.map(x => x[0]).join("");
    } else {
      resultKey = sorted[0][0] + sorted[1][0];
    }

    const response = await fetch("angels.json");
    const data = await response.json();
    const angel = data[resultKey];

    document.getElementById("angelTitle").innerText = angel.title;
    document.getElementById("angelDesc").innerText = angel.description;
    document.getElementById("angelKeywords").innerText = angel.keywords.join(", ");
    document.getElementById("angelGrowth").innerText = angel.growth;

    document.getElementById("result").style.display = "block";
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
};
