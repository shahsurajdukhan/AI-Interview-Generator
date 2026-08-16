const role = document.getElementById("role");
const difficulty = document.getElementById("difficulty");
const number = document.getElementById("number");

const generateBtn = document.getElementById("generateBtn");
const questions = document.getElementById("questions");
const loading = document.getElementById("loading");


generateBtn.addEventListener("click", function() {
  const selectedRole = role.value;
    const selectedDifficulty = difficulty.value;
    const questionCount = Number(number.value);

    console.log(selectedRole);
    console.log(selectedDifficulty);
    console.log(questionCount);

    questions.innerHTML = "";

    for (let i = 1; i <= questionCount; i++) {
        const question = document.createElement("div");

        question.className = "question-card";

        question.innerHTML = `
            <h3>Question ${i}</h3>
            <p>
            This is a ${selectedDifficulty} question for a ${selectedRole}.

            </p>
           ` ;
        questions.appendChild(question);

    }

});