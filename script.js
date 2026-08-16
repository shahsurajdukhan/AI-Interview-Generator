const role = document.getElementById("role");
const difficulty = document.getElementById("difficulty");
const number = document.getElementById("number");

const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click",function() {
    console.log ("button clicked");

    console.log("Role:", role.value);
    console.log("Difficulty:",difficulty.value);
    console.log("Number:",number.value);
});