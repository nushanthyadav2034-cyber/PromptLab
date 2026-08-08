# PromptLab

PromptLab is a lightweight web application that allows users to test and interact with AI prompt templates (e.g., text summarization, professional email rewriting, and simple explanations) powered by the Google Gemini API.

## Features
- Server-side template construction to keep system prompts organized and secure
- Integration with Google Gemini API (`gemini-1.5-flash`)
- Interactive UI with loading indicators, error handling, and output display
- Built-in Responsible AI notice for user safety

## Project Structure
```text
promptlab/
├── public/
│   ├── index.html
│   └── script.js
├── .env (Excluded from Git)
├── .gitignore
├── package.json
├── README.md
└── server.js
