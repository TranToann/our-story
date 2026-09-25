const questions = [
  {
    text: "Câu 1: Em là ai với anh?",
    options: ["Bạn bình thường", "Vợ iu của anh ❤️", "Người lạ"],
    correct: 1,
    wrong: "Sai nha 😤 Nghĩ lại đi vợ iu!"
  },
  {
    text: "Câu 2: Sau này hai đứa mình sẽ...",
    options: ["Đi ăn một bữa rồi thôi", "Về chung một nhà 🏡", "Ai về nhà nấy mãi mãi"],
    correct: 1,
    wrong: "Không được chọn đáp án đó đâu nha 🥺"
  },
  {
    text: "Câu cuối: Em có đồng ý để anh thương em thật lâu không?",
    options: ["Có ❤️", "Rất có ❤️❤️", "Không cho chọn đâu 😌"],
    correct: [0, 1, 2],
    wrong: ""
  }
];

let currentQuestion = 0;

const gate = document.getElementById("gate");
const letterScreen = document.getElementById("letterScreen");
const questionText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const hint = document.getElementById("hint");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const replayBtn = document.getElementById("replayBtn");
const heartLayer = document.getElementById("heartLayer");

function renderQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;
  optionsEl.innerHTML = "";
  hint.textContent = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    optionsEl.appendChild(btn);
  });

  const progress = (currentQuestion / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
}

function selectAnswer(index, button) {
  const q = questions[currentQuestion];
  const isCorrect = Array.isArray(q.correct)
    ? q.correct.includes(index)
    : index === q.correct;

  if (!isCorrect) {
    button.classList.remove("wrong");
    void button.offsetWidth;
    button.classList.add("wrong");
    hint.textContent = q.wrong;
    return;
  }

  button.classList.add("correct");
  hint.textContent = currentQuestion === questions.length - 1
    ? "Được rồi... mở quà thôi ❤️"
    : "Đúng rồi đó vợ 😚";

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      progressBar.style.width = "100%";
      openLetterScreen();
    }
  }, 650);
}

function openLetterScreen() {
  gate.classList.remove("active");
  letterScreen.classList.add("active");
  createHeartBurst(18);
}

envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.classList.remove("hidden");
  createHeartBurst(30);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

replayBtn.addEventListener("click", () => {
  currentQuestion = 0;
  letter.classList.add("hidden");
  envelope.style.display = "grid";
  letterScreen.classList.remove("active");
  gate.classList.add("active");
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > 0.45 ? "❤" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heart.style.opacity = `${0.35 + Math.random() * 0.5}`;
  heartLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

function createHeartBurst(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(createHeart, i * 80);
  }
}

setInterval(createHeart, 1100);
renderQuestion();
