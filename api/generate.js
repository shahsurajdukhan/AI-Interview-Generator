const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

module.exports = async function handler(req,res) {
    if (req.method !== "POST") {
        return res.status(405).json ({
            error: "Method not allowed"
        });
    }

    try {

        const { role, difficulty, number } = req.body;

        console.log("Generating questions...");
        console.log(role, difficulty, number);

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
        "answer": "JavaScript is a programming language used to create interactive web applications."
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

        res.status(200).json({
            questions: response.text
        });

    } catch (error) {

        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            error: "AI request failed",
            details: error.message
        });
    }
};