const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static(__dirname));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/generate", async (req, res) => {

    try {

        const { role, difficulty, number } = req.body;

        console.log("Generating questions...");
        console.log("Role:", role);
        console.log("Difficulty:", difficulty);
        console.log("Number:", number);

        const prompt = `
Generate ${number} interview questions for a ${role} position.

Difficulty: ${difficulty}

Return ONLY a JSON array.

Each object must contain:
- question
- answer

Example:
[
    {
        "question": "What is JavaScript?",
        "answer": "JavaScript is a programming language used to build interactive web applications."
    }
]
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        console.log("AI response received!");

        res.json({
            questions: response.text
        });

    } catch (error) {

        console.error("GEMINI ERROR:");
        console.error(error);

        res.status(500).json({
            error: "AI request failed",
            details: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});