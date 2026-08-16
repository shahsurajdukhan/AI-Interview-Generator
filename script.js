const role = document.getElementById("role");
const difficulty = document.getElementById("difficulty");
const number = document.getElementById("number");

const generateBtn = document.getElementById("generateBtn");
const questions = document.getElementById("questions");
const loading = document.getElementById("loading");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeText = themeToggle.querySelector(".theme-text");
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function applyTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeText.textContent = isDark ? "Light" : "Dark";
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeToggle.addEventListener("click", () => {
    applyTheme(!document.documentElement.classList.contains("dark"));
});

const mouse = { x: null, y: null, active: false };
let particles = [];
let animationId = 0;

function particleCount() {
    const area = window.innerWidth * window.innerHeight;
    return Math.max(45, Math.min(110, Math.floor(area / 14000)));
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

function initParticles() {
    const count = particleCount();
    particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 1.1,
        glow: 0
    }));
}

function themeColors() {
    const dark = document.documentElement.classList.contains("dark");
    return dark
        ? { dot: "rgba(180, 210, 255, 0.85)", line: [150, 190, 255], mouse: [120, 200, 255] }
        : { dot: "rgba(190, 90, 130, 0.7)", line: [210, 110, 150], mouse: [230, 90, 140] };
}

function drawNetwork() {
    const colors = themeColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const linkDistance = 130;
    const mouseDistance = 180;

    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        let targetGlow = 0;
        if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseDistance) {
                targetGlow = 1 - dist / mouseDistance;
                p.x += dx * -0.004;
                p.y += dy * -0.004;
            }
        }
        p.glow += (targetGlow - p.glow) * 0.06;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + p.glow * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = colors.dot;
        ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);

            if (dist < linkDistance) {
                const proximity = 1 - dist / linkDistance;
                const boost = Math.max(a.glow, b.glow);
                const alpha = (0.12 + boost * 0.35) * proximity;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(${colors.line[0]}, ${colors.line[1]}, ${colors.line[2]}, ${alpha})`;
                ctx.lineWidth = 1 + boost * 0.8;
                ctx.stroke();
            }
        }

        if (mouse.active) {
            const p = particles[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseDistance) {
                const alpha = (1 - dist / mouseDistance) * 0.45 * (0.25 + p.glow);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(${colors.mouse[0]}, ${colors.mouse[1]}, ${colors.mouse[2]}, ${alpha})`;
                ctx.lineWidth = 1.1;
                ctx.stroke();
            }
        }
    }

    animationId = requestAnimationFrame(drawNetwork);
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.active = true;
});

window.addEventListener("mouseleave", () => {
    mouse.active = false;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawNetwork();

generateBtn.addEventListener("click", async function() {
    generateBtn.disabled = true;
    generateBtn.innerText = "Generating...";

    const selectedRole = role.value;
    const selectedDifficulty = difficulty.value;
    const questionCount = Number(number.value);

    questions.innerHTML = "";
    loading.innerHTML = "Generating questions...";

    try {
        const response = await fetch("/api/generate", {
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
                <button type="button" class="toggle-answer" aria-expanded="false">
                    <span class="chevron">▼</span>
                    <span class="toggle-label">Show Answer</span>
                </button>
                <div class="answer-panel">
                    <p>${item.answer}</p>
                </div>
            `;
            questions.appendChild(question);

            const toggleBtn = question.querySelector(".toggle-answer");
            const answerPanel = question.querySelector(".answer-panel");
            const toggleLabel = question.querySelector(".toggle-label");

            toggleBtn.addEventListener("click", () => {
                const isOpen = answerPanel.classList.toggle("open");
                toggleBtn.classList.toggle("open", isOpen);
                toggleBtn.setAttribute("aria-expanded", String(isOpen));
                toggleLabel.textContent = isOpen ? "Hide Answer" : "Show Answer";

                if (isOpen) {
                    answerPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            });
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
