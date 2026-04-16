async function loadQuestion() {
  const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
  const data = await res.json();

  const q = data.results[0];

  document.getElementById("question").innerHTML = q.question;

  const answers = [...q.incorrect_answers, q.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerHTML = ans;
    btn.onclick = () => checkAnswer(ans, q.correct_answer);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  const result = document.getElementById("result");

  if (selected === correct) {
    result.innerText = "✅ Correct!";
  } else {
    result.innerText = "❌ Wrong! Correct: " + correct;
  }
}

loadQuestion();
