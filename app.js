const questions = [
  { q: "1. 누군가 힘들다고 털어놓을 때, 나는?", options: [
      { text: "함께 울어주며 들어준다", value: "G" },
      { text: "현실적인 해결책을 제시한다", value: "T" },
      { text: "조용히 곁에 있어준다", value: "A" },
      { text: "양쪽 입장을 살펴 균형을 맞춘다", value: "H" }
  ]},
  { q: "2. 갈등 상황에서 나는?", options: [
      { text: "상대의 마음을 먼저 헤아린다", value: "G" },
      { text: "필요한 말은 직설적으로 한다", value: "T" },
      { text: "충돌을 피하며 자리를 지킨다", value: "A" },
      { text: "타협점을 찾아 조율한다", value: "H" }
  ]},
  { q: "3. 친구가 고민을 털어놓으면?", options: [
      { text: "같이 울면서 공감한다", value: "G" },
      { text: "현실적인 조언을 준다", value: "T" },
      { text: "그냥 묵묵히 들어준다", value: "A" },
      { text: "여러 가능성을 비교해준다", value: "H" }
  ]},
  { q: "4. 중요한 결정을 앞두고 나는?", options: [
      { text: "타인의 감정을 고려한다", value: "G" },
      { text: "현실적으로 따져본다", value: "T" },
      { text: "시간을 두고 조용히 지켜본다", value: "A" },
      { text: "여러 선택지의 균형을 맞춘다", value: "H" }
  ]},
  { q: "5. 상대가 화를 낼 때, 나는?", options: [
      { text: "그의 감정에 동조한다", value: "G" },
      { text: "문제 해결부터 말한다", value: "T" },
      { text: "잠자코 들어준다", value: "A" },
      { text: "화해할 방법을 찾는다", value: "H" }
  ]},
  { q: "6. 새로운 모임에서 나는?", options: [
      { text: "먼저 다가가 따뜻하게 맞이한다", value: "G" },
      { text: "분위기를 이끌며 주도한다", value: "T" },
      { text: "조용히 지켜본다", value: "A" },
      { text: "모두가 어울리도록 조율한다", value: "H" }
  ]},
  { q: "7. 누군가 부탁을 할 때, 나는?", options: [
      { text: "거절하기 힘들다", value: "G" },
      { text: "부담이 되면 분명히 거절한다", value: "T" },
      { text: "말없이 들어준다", value: "A" },
      { text: "상황에 맞춰 적당히 수용한다", value: "H" }
  ]},
  { q: "8. 문제가 발생하면 나는?", options: [
      { text: "먼저 감정을 읽는다", value: "G" },
      { text: "해결 방안을 바로 찾는다", value: "T" },
      { text: "상황을 피하고 관망한다", value: "A" },
      { text: "모두가 납득할 방법을 찾는다", value: "H" }
  ]},
  { q: "9. 팀 프로젝트에서 나는?", options: [
      { text: "분위기를 부드럽게 만든다", value: "G" },
      { text: "성과를 위해 밀어붙인다", value: "T" },
      { text: "묵묵히 맡은 일을 한다", value: "A" },
      { text: "의견 차이를 조율한다", value: "H" }
  ]},
  { q: "10. 가까운 사람이 울 때 나는?", options: [
      { text: "같이 울어준다", value: "G" },
      { text: "문제의 원인을 짚는다", value: "T" },
      { text: "옆에만 있어준다", value: "A" },
      { text: "위로하면서 갈등을 줄인다", value: "H" }
  ]},
  { q: "11. 대화를 나눌 때 나는?", options: [
      { text: "상대의 감정에 맞춰준다", value: "G" },
      { text: "내 생각을 똑바로 말한다", value: "T" },
      { text: "잘 듣기만 한다", value: "A" },
      { text: "균형 잡힌 대화를 유도한다", value: "H" }
  ]},
  { q: "12. 선택을 강요받으면 나는?", options: [
      { text: "상대가 원하는 쪽을 따른다", value: "G" },
      { text: "내가 옳다고 생각한 걸 고른다", value: "T" },
      { text: "피하면서 결정을 미룬다", value: "A" },
      { text: "모두에게 적합한 선택을 한다", value: "H" }
  ]},
  { q: "13. 스트레스 받을 때 나는?", options: [
      { text: "친구와 감정을 나눈다", value: "G" },
      { text: "운동이나 일로 풀어낸다", value: "T" },
      { text: "혼자 조용히 쉬며 버틴다", value: "A" },
      { text: "여러 방법을 시도하며 조율한다", value: "H" }
  ]},
  { q: "14. 가족과 갈등이 생기면 나는?", options: [
      { text: "감정을 공유하려 한다", value: "G" },
      { text: "정면 돌파로 이야기한다", value: "T" },
      { text: "대화를 피한다", value: "A" },
      { text: "타협점을 찾으려 한다", value: "H" }
  ]},
  { q: "15. 누군가 실수를 했을 때 나는?", options: [
      { text: "마음을 먼저 달래준다", value: "G" },
      { text: "잘못을 지적하고 바로잡는다", value: "T" },
      { text: "묵묵히 넘어간다", value: "A" },
      { text: "실수의 의미를 줄이며 균형을 찾는다", value: "H" }
  ]}
];
