const role = document.getElementById("role");
const difficulty = document.getElementById("difficulty");
const number = document.getElementById("number");

const generateBtn = document.getElementById("generateBtn");
const questions = document.getElementById("questions");
const loading = document.getElementById("loading");


generateBtn.addEventListener("click", async function() {
  generateBtn.disabled = true;
  generateBtn.innerText = "Generating...";  
  
    const selectedRole = role.value;
    const selectedDifficulty = difficulty.value;
    const questionCount = Number(number.value);

    questions.innerHTML = "";
    loading.innerHTML = "Generating questions...";

    try { 
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                role: selectedRole,
                difficulty: selectedDifficulty,
                number: questionCount
            })

        });

        const data = await response.json();

        console.log(data);

        loading.innerHTML = "";

        const aiQuestions = JSON.parse(data.questions);

        aiQuestions.forEach((item, index) => {
            const question = document.createElement("div");

            question.className = "question-card";

            question.innerHTML = `
                <h3>Question ${index + 1}</h3>
                <p>
                ${item.question}
                </p>
                <details>
                    <summary>Show Answer</summary>
                    <p>${item.answer}</p>
                </details>
            `;
            questions.appendChild(question);
        });
        generateBtn.disabled = false;
        generateBtn.innerText = "Generate Questions";

    } catch (error) {
        generateBtn.disabled = false;
        generateBtn.innerText = "Generate Questions";
        console.error(error);
            loading.innerHTML = "Something went wrong. Check the Server.";

    }

});
