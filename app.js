// app.js

const questions = [
  { text: "누군가 힘들다고 털어놓으면, 나는 자연스럽게 들어주고 위로하려 한다.", weights: { G: 2 } },
  { text: "관계에서 갈등이 생기면, 상대방을 이해하려는 태도를 먼저 가진다.", weights: { G: 2 } },
  { text: "친밀한 관계가 불편하더라도, 상대가 외로울까 봐 곁을 지켜준다.", weights: { G: 2 } },
  { text: "타인의 부탁을 거절하기보다는 웬만하면 들어주려 한다.", weights: { G: 2 } },
  { text: "상대방이 인정해주지 않으면, 내 가치가 줄어든 것처럼 느낀다.", weights: { G: 1 } },
  { text: "상대가 기뻐하면 나도 덩달아 기뻐지고, 그 감정에 크게 영향을 받는다.", weights: { G: 1 } },
  { text: "내 감정을 드러내기보다는, 상대의 감정을 먼저 살피고 맞춘다.", weights: { G: 1 } },

  { text: "불공정한 상황을 보면, 불편하더라도 바로 문제를 지적한다.", weights: { T: 2 } },
  { text: "상대가 나를 얕잡아본다고 느끼면, 강하게 반응한다.", weights: { T: 2 } },
  { text: "갈등이 생겼을 때 피하기보다는, 끝까지 논리적으로 따지고 싶다.", weights: { T: 2 } },
  { text: "대화에서 솔직한 직언을 중요하게 생각한다.", weights: { T: 2 } },
  { text: "타인의 눈치를 보느니, 차라리 내 주장을 분명히 밝힌다.", weights: { T: 2 } },
  { text: "상황을 주도하지 못하면 답답해지고 불안하다.", weights: { T: 1 } },
  { text: "내가 옳다고 확신할 때는 타협보다는 관철시키려 한다.", weights: { T: 2 } },

  { text: "불편한 상황에 휘말리기보다는 조용히 물러난다.", weights: { A: 2 } },
  { text: "갈등이 생기면, 내가 참으면 해결된다고 생각한다.", weights: { A: 2 } },
  { text: "모임에서 말하기보다는 듣는 편이 더 편하다.", weights: { A: 2 } },
  { text: "내 감정을 드러내면 오히려 불이익을 당할까 걱정된다.", weights: { A: 1 } },
  { text: "큰 소란이나 다툼보다는 차라리 거리를 두는 게 낫다.", weights: { A: 2 } },
  { text: "상처받을 위험이 보이면, 관계를 깊게 맺지 않는다.", weights: { A: 2 } },
  { text: "피곤한 상황이 되면 스스로 단절하고 혼자 시간을 갖는다.", weights: { A: 2 } },

  { text: "상대가 나에게 무리한 요구를 하면, 한 번은 들어주지만 반복되면 단호히 거절한다.", weights: { G: 1, T: 1 } },
  { text: "소중한 사람과의 관계에서는 갈등을 회피하지 않고 맞서 해결하려 한다.", weights: { G: 1, T: 1 } },
  { text: "평소에는 다정하지만, 신뢰를 깨뜨리면 강하게 대립한다.", weights: { G: 1, T: 1 } },
  { text: "갈등을 피하고 싶지만, 관계가 소중하면 억지로라도 붙잡으려 한다.", weights: { G: 1, A: 1 } },
  { text: "거절하지 못하고 받아주다가, 결국 지쳐 혼자 거리를 둔다.", weights: { G: 1, A: 1 } },
  { text: "겉으로는 잘 맞춰주지만, 속으로는 혼자 감정을 삼키며 멀어진다.", weights: { G: 1, A: 1 } },
  { text: "겉으로는 물러서는 척하지만, 속으로는 불만을 쌓아두며 날카롭게 관찰한다.", weights: { T: 1, A: 1 } },
  { text: "공개적으로는 피하지만, 뒤에서 차갑게 단절해버린다.", weights: { A: 2 } },
  { text: "논쟁에서는 한발 빼지만, 마음속에서는 강한 반감을 오래 간직한다.", weights: { A: 1, T: 1 } }
];

// DOM 로딩 후 질문 표시
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("questions");

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <p>${q.text}</p>
      <label><input type="radio" name="q${i}" value="1" required> 전혀 그렇지 않다</label>
      <label><input type="radio" name="q${i}" value="2"> 그렇지 않다</label>
      <label><input type="radio" name="q${i}" value="3"> 보통이다</label>
      <label><input type="radio" name="q${i}" value="4"> 그렇다</label>
      <label><input type="radio" name="q${i}" value="5"> 매우 그렇다</label>
    `;
    container.appendChild(div);
  });

  // 결과 계산
  document.getElementById("quizForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let scores = { G: 0, T: 0, A: 0 };

    questions.forEach((q, i) => {
      const val = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
      for (const [k, w] of Object.entries(q.weights)) {
        scores[k] += val * w;
      }
    });

    // 정렬 후 유형 판정
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [f, s, t] = sorted;

    let type;
    if (f[1] - s[1] >= 8) {
      type = f[0] + f[0];
    } else if (s[1] - t[1] >= 5) {
      type = f[0] + s[0];
    } else {
      type = f[0] + s[0] + t[0];
    }

    // 결과 출력
    try {
      const res = await fetch("angels.json");
      const data = await res.json();
      const angel = data[type];

      if (angel) {
        document.getElementById("angelTitle").textContent = angel.title;
        document.getElementById("angelDesc").textContent = angel.description;
        document.getElementById("angelKeywords").textContent = angel.keywords.join(", ");
        document.getElementById("angelGrowth").textContent = angel.growth;
        document.getElementById("result").style.display = "block";
      } else {
        document.getElementById("angelTitle").textContent = "결과 없음";
        document.getElementById("result").style.display = "block";
      }
    } catch (err) {
      console.error("angels.json 로딩 오류:", err);
    }
  });
});
