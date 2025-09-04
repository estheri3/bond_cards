// 질문 풀
const questions = {
  connect: [
    "나와 하나님을 이어주는 매듭 같은 순간은 언제였나요?",
    "공동체 안에서 서로 묶여 있다는 것을 강하게 느낀 경험은?",
    "내 삶에서 끊어지지 않고 이어져야 할 신앙의 매듭은 무엇인가요?",
    "나를 지금 이 자리에 있게 한 매듭 같은 관계는 누구인가요?",
    "신앙 생활에서 매듭처럼 단단히 이어진 습관은 무엇인가요?"
  ],
  bind: [
    "내 삶에서 풀리지 않은 매듭(문제)은 무엇인가요?",
    "내 마음을 꽉 묶고 있는 근심은 무엇인가요?",
    "죄의 습관이라는 매듭이 나를 묶고 있다고 느낀 적 있나요?",
    "혼자서는 풀 수 없었던 매듭 같은 경험은 무엇인가요?",
    "복잡하게 얽힌 관계나 상황이 매듭처럼 느껴진 적 있나요?"
  ],
  free: [
    "하나님께서 내 삶에서 풀어주신 매듭은 무엇인가요?",
    "매듭이 풀리듯 내 마음이 가벼워졌던 순간은 언제였나요?",
    "용서를 통해 풀린 매듭 같은 경험이 있나요?",
    "예수님께서 나를 자유케 하셨음을 경험한 적 있나요?",
    "자유롭게 된다는 것은 내 삶에서 어떤 의미인가요?"
  ]
};

// 섹션 전환 + 초기 질문 세팅
function nextSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'section1') {
    drawQuestion('q1','connect');
    resetBtns('retry1','next1');
  }
  if (id === 'section2') {
    drawQuestion('q2','bind');
    resetBtns('retry2','next2');
  }
  if (id === 'section3') {
    drawQuestion('q3','free');
    resetBtns('retry3','next3');
  }
}

// 랜덤 질문 뽑기
function drawQuestion(boxId, category) {
  const box = document.getElementById(boxId);
  const qlist = questions[category];
  const q = qlist[Math.floor(Math.random() * qlist.length)];
  box.innerHTML = `<p><b>💡 질문:</b> ${q}</p>`;
}

// 다시 뽑기 → 질문 교체, 버튼 전환
function retry(boxId, category, retryId, nextId) {
  drawQuestion(boxId, category);
  document.getElementById(retryId).style.display = "none";
  document.getElementById(nextId).style.display = "inline-block";
}

// 버튼 상태 초기화
function resetBtns(retryId, nextId) {
  document.getElementById(retryId).style.display = "inline-block";
  document.getElementById(nextId).style.display = "none";
}
