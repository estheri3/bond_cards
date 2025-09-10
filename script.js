const questions = {
  connect: [
    {
      q: "나와 하나님을 이어주는 매듭 같은 순간은 언제였나요?",
      verse: "나는 확신합니다... (로마서 8:38-39)",
      tags: ["#하나님", "#매듭", "#연결"]
    },
    {
      q: "공동체 안에서 서로 묶여 있다는 것을 느낀 경험은?",
      verse: "두 사람이면 맞설 수 있나니... (전도서 4:12)",
      tags: ["#공동체", "#연결"]
    }
  ],
  bind: [
    {
      q: "내 삶에서 풀리지 않은 매듭(문제)은 무엇인가요?",
      verse: "내가 원하는 바 선은 행하지 아니하고... (로마서 7:19)",
      tags: ["#문제", "#결박"]
    }
  ],
  free: [
    {
      q: "하나님께서 내 삶에서 풀어주신 매듭은 무엇인가요?",
      verse: "진리를 알지니 진리가 너희를 자유롭게 하리라 (요 8:32)",
      tags: ["#자유", "#해방"]
    }
  ]
};

const lastPicked = { connect: null, bind: null, free: null };

// 섹션 전환 → 버튼 숨김
function nextSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'section1') hideBtns('retry1','next1');
  if (id === 'section2') hideBtns('retry2','next2');
  if (id === 'section3') hideBtns('retry3','next3');
}

// 카드 플립 (click + touch 지원)
function enableCardFlip(cardId, boxId, category, retryId, nextId) {
  const cardElement = document.getElementById(cardId);

  const flipHandler = () => {
    drawQuestion(boxId, category);
    cardElement.classList.add('is-flipped');

    // 질문 나오면 다시뽑기 버튼만 보이기
    document.getElementById(retryId).style.display = "inline-block";
    document.getElementById(nextId).style.display = "none";
  };

  cardElement.addEventListener("click", flipHandler);
  cardElement.addEventListener("touchstart", flipHandler);
}

// 질문 뽑기
function drawQuestion(boxId, category) {
  const box = document.getElementById(boxId);
  const qlist = questions[category];

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * qlist.length);
  } while (randomIndex === lastPicked[category] && qlist.length > 1);

  lastPicked[category] = randomIndex;
  const qobj = qlist[randomIndex];

  box.innerHTML = `
    <h3>Question</h3>
    <p>${qobj.q}</p>
    <h3>Verse</h3>
    <p>${qobj.verse}</p>
    <div class="tags">${qobj.tags.map(t=>`<span>${t}</span>`).join('')}</div>
  `;
}

// 다시 뽑기 → 새로운 질문 + 다음으로 버튼
function retry(boxId, category, retryId, nextId) {
  drawQuestion(boxId, category);
  document.getElementById(retryId).style.display = "none";
  document.getElementById(nextId).style.display = "inline-block";
}

// 버튼 숨김
function hideBtns(retryId, nextId) {
  document.getElementById(retryId).style.display = "none";
  document.getElementById(nextId).style.display = "none";
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  enableCardFlip("card1", "q1", "connect", "retry1", "next1");
  enableCardFlip("card2", "q2", "bind", "retry2", "next2");
  enableCardFlip("card3", "q3", "free", "retry3", "next3");
});
