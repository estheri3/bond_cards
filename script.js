// 질문 + 말씀 + 태그 데이터
const questions = {
  connect: [
    {
      q: "나와 하나님을 이어주는 매듭 같은 순간은 언제였나요?",
      verse: "(로마서 8:38-39)",
      tags: ["#하나님", "#매듭", "#연결"]
    },
    {
      q: "공동체 안에서 서로 묶여 있다는 것을 느낀 경험은?",
      verse: "(골로새서 3:14)",
      tags: ["#공동체", "#연결"]
    }
  ],
  bind: [
    {
      q: "내 삶에서 풀리지 않은 매듭(문제)은 무엇인가요?",
      verse: "(마태복음 11:28)",
      tags: ["#문제", "#결박"]
    }
  ],
  free: [
    {
      q: "하나님께서 내 삶에서 풀어주신 매듭은 무엇인가요?",
      verse: "(요한복음 8:36)",
      tags: ["#자유", "#해방"]
    }
  ]
};

// 마지막으로 뽑힌 질문 인덱스 저장
const lastPicked = { connect: null, bind: null, free: null };

// 섹션 전환
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

// 카드 열기 버튼 클릭 시 플립 + 다음으로 버튼 보이기
function flipCard(cardId) {
  const cardElement = document.getElementById(cardId);
  cardElement.classList.add('is-flipped');

  // 해당 카드의 "next" 버튼 보이기
  const nextBtn = cardElement.parentElement.querySelector('button[id^="next"]');
  if (nextBtn) {
    nextBtn.style.display = "inline-block";
  }
}

// 질문 뽑기 (이전 질문 제외)
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

  // 다시 뽑기 시 → 카드 닫기
  const cardElement = box.closest('.card');
  cardElement.classList.remove('is-flipped');
}

// 다시 뽑기 → 새로운 질문 뽑고 카드 닫기
function retry(boxId, category, retryId, nextId) {
  drawQuestion(boxId, category);
  document.getElementById(retryId).style.display = "inline-block";
  document.getElementById(nextId).style.display = "none"; // 숨김
}

// 버튼 초기화
function resetBtns(retryId, nextId) {
  document.getElementById(retryId).style.display = "inline-block";
  document.getElementById(nextId).style.display = "none";
}

console.log("✅ script.js loaded");
