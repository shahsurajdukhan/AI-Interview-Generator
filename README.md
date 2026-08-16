#  AI Interview Question Generator

An AI-powered web application that generates **role-specific interview questions and answers** based on the selected job role, difficulty level, and number of questions.

Built with **JavaScript, Node.js, Express, and Google Gemini API**, this project demonstrates how a frontend application can communicate with an AI model through a secure backend API.

## 🌐 Live Demo

**Live:** https://ai-interview-generator-eta.vercel.app/

---

## ✨ Features

* 🤖 Generate interview questions using Google Gemini AI
* 💼 Choose from different job roles
* 🎯 Select interview difficulty
* 🔢 Generate 1–10 questions at a time
* 💡 Get an AI-generated answer for every question
* ⚡ Fast and simple user interface
* 🔐 API key securely stored using environment variables
* 📱 Responsive and beginner-friendly interface
* ☁️ Deployed on Vercel

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* DOM Manipulation
* Fetch API

### Backend

* Node.js
* Express.js
* REST API

### AI

* Google Gemini API
* `@google/genai`

### Deployment

* Vercel
* GitHub

---

## 🔄 How It Works

The application follows a simple **Frontend → Backend → AI → Backend → Frontend** flow.

```text
┌──────────────────────┐
│       User           │
│                      │
│ Role                 │
│ Difficulty           │
│ Number of Questions  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Frontend        │
│ HTML + CSS + JS      │
└──────────┬───────────┘
           │
           │ POST /api/generate
           ▼
┌──────────────────────┐
│       Backend        │
│ Node.js + Express    │
└──────────┬───────────┘
           │
           │ Prompt
           ▼
┌──────────────────────┐
│    Google Gemini     │
│      AI Model        │
└──────────┬───────────┘
           │
           │ Questions + Answers
           ▼
┌──────────────────────┐
│       Backend        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Frontend        │
│  Display AI Results  │
└──────────────────────┘
```

### Example

The user selects:

```text
Role       → Frontend Developer
Difficulty → Medium
Questions  → 5
```

The frontend sends this information to the backend:

```json
{
  "role": "Frontend Developer",
  "difficulty": "Medium",
  "number": 5
}
```

The backend creates an AI prompt and sends it to Gemini.

Gemini returns structured questions and answers, which are then displayed dynamically on the frontend.

---

## 📂 Project Structure

```text
ai-interview-generator/
│
├── api/
│   └── generate.js        # AI API endpoint
│
├── index.html             # Main UI
├── style.css              # Application styling
├── script.js              # Frontend logic
│
├── server.js              # Local development server
├── package.json           # Project dependencies
├── .gitignore             # Ignored files
└── README.md
```

---

## 🔐 Environment Variables

The Gemini API key is **never exposed in the frontend**.

Create a `.env` file for local development:

```env
GEMINI_API_KEY=your_api_key_here
```

For production, the environment variable is configured through Vercel.

### Why?

Instead of putting the API key inside browser JavaScript:

```text
Browser
   ↓
❌ API Key exposed
```

the application uses:

```text
Browser
   ↓
Backend API
   ↓
Gemini API
```

This keeps the API credential on the server side.

> **Note:** Never commit your `.env` file to GitHub.

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-interview-generator.git
```

### 2. Enter the project

```bash
cd ai-interview-generator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

```env
GEMINI_API_KEY=your_api_key_here
```

### 5. Start the server

```bash
node server.js
```

### 6. Open the application

```text
http://localhost:3000
```

---

## 📡 API Endpoint

### Generate Interview Questions

```http
POST /api/generate
```

### Request

```json
{
  "role": "Backend Developer",
  "difficulty": "Hard",
  "number": 5
}
```

### Response

```json
{
  "questions": [
    {
      "question": "Explain the difference between authentication and authorization.",
      "answer": "Authentication verifies who a user is, while authorization determines what the user is allowed to access."
    }
  ]
}
```

---

## 🧠 Key Concepts Demonstrated

This project was built to practice and demonstrate several important development concepts:

* JavaScript DOM manipulation
* Event handling
* `async/await`
* Fetch API
* REST API communication
* JSON parsing and serialization
* Node.js backend development
* Express.js routing
* Environment variables
* API integration
* AI prompt engineering
* Dynamic UI rendering
* Error handling
* Server-side API key protection
* Vercel deployment

---

## 🎯 Why I Built This

Interview preparation often requires searching for questions that match a specific role and difficulty level.

This project solves that problem by allowing users to generate **custom interview questions on demand using AI**.

More importantly, it provided hands-on experience with the complete flow of a modern AI-powered web application:

```text
Frontend
   ↓
REST API
   ↓
Backend
   ↓
AI Model
   ↓
Structured Response
   ↓
Dynamic UI
```

---

## 🔮 Future Improvements

Planned improvements include:

* 🎤 AI-powered mock interview mode
* 📝 User answer evaluation
* 📊 Interview performance score
* 🧠 Personalized follow-up questions
* 💾 Interview history
* 👤 User authentication
* 📚 Topic-specific interviews
* ⏱️ Timed interview sessions
* 🌙 Dark mode
* 📱 Improved mobile UI

---

## 👨‍💻 Author

**Suraj Shah**

Computer Science & Engineering Student

Interested in **Software Development, Backend Engineering, AI, and Full-Stack Development**.

---

## ⭐ Feedback

If you find this project useful, consider giving the repository a ⭐ on GitHub.
