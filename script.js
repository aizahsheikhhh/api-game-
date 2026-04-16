async function getQuestion() {
    const resultText = document.getElementById('result');
    const questionText = document.getElementById('question');
    const answerDiv = document.getElementById('answer-buttons');
    
    resultText.innerText = "";
    questionText.innerText = "Loading...";
    answerDiv.innerHTML = "";

    try {
        const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const data = await response.json();
        const item = data.results[0];

        questionText.innerHTML = item.question;

        // Mix the correct answer with the wrong ones
        let answers = [...item.incorrect_answers];
        answers.push(item.correct_answer);
        answers.sort(() => Math.random() - 0.5);

        answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.innerHTML = ans;
            btn.onclick = () => {
                if(ans === item.correct_answer) {
                    resultText.innerText = "Correct! 🎉";
                    resultText.style.color = "green";
                } else {
                    resultText.innerText = "Wrong! It was: " + item.correct_answer;
                    resultText.style.color = "red";
                }
            };
            answerDiv.appendChild(btn);
        });
    } catch (error) {
        questionText.innerText = "Error loading question. Try again!";
    }
}
