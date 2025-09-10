// 질문 + 말씀 + 태그 데이터
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
      verse: "진리를 알지니 진리가 너희를 자유롭게 하리라 (요한복음 8:32)",
      tags: ["#자유", "#해방"]
    }
  ]
};

const lastPicked = { connect: null, bind: null, free: null };

// 섹션 전환 → 버튼 초기화 (버튼 안 보이게)
function nextSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // 버튼들 초기화
  if (id === 'section1') hideBtns('retry1','next1');
  if (id === 'section2') hideBtns('retry2','next2');
  if (id === 'section3') hideBtns('retry3','next3');
}

// 카드 클릭 → 질문 세팅 + 플립 + "다시 뽑기" 버튼만 보이기
function flipCard(cardId) {
  const cardElement = document.getElementById(cardId);

  const backFace = cardElement.querySelector('.card__face--back .question-box');
  const boxId = backFace ? backFace.id : null;

  let category = null;
  if (boxId === 'q1') category = 'connect';
  if (boxId === 'q2') category = 'bind';
  if (boxId === 'q3') category = 'free';

  if (category) {
    drawQuestion(boxId, category);
  }

  cardElement.classList.add('is-flipped');

  // 카드 클릭 → "다시 뽑기" 버튼만 보이기
  const retryBtn = cardElement.parentElement.querySelector('button[id^="retry"]');
  const nextBtn = cardElement.parentElement.querySelector('button[id^="next"]');
  if (retryBtn) retryBtn.style.display = "inline-block";
  if (nextBtn) nextBtn.style.display = "none";
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

// 다시 뽑기 → 새로운 질문 + "다시 뽑기" 숨기고 "다음으로" 보이기
function retry(boxId, category, retryId, nextId) {
  drawQuestion(boxId, category);
  document.getElementById(retryId).style.display = "none";
  document.getElementById(nextId).style.display = "inline-block";
}

// 버튼 숨기기
function hideBtns(retryId, nextId) {
  document.getElementById(retryId).style.display = "none";
  document.getElementById(nextId).style.display = "none";
}
