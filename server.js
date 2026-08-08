require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is missing from .env file.");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Prompt Templates Store
const TEMPLATES = {
  summarize: {
    name: "Summarize Text",
    systemPrompt: "Provide a concise bullet-point summary of the following text:\n\n"
  },
  rewrite_professional: {
    name: "Rewrite Professionally",
    systemPrompt: "Rewrite the following text into clear, professional business communication:\n\n"
  },
  explain_eli5: {
    name: "Explain Like I'm 5",
    systemPrompt: "Explain the following concept using simple analogies suitable for a 5-year-old:\n\n"
  }
};

// POST /api/generate Route
app.post("/api/generate", async (req, res) => {
  try {
    const { templateId, userInput } = req.body;

    // Validate Input
    if (!templateId || !userInput) {
      return res.status(400).json({ error: "Both templateId and userInput are required." });
    }

    const selectedTemplate = TEMPLATES[templateId];
    if (!selectedTemplate) {
      return res.status(400).json({ error: "Invalid template selected." });
    }

    // Construct full prompt on server side
    const fullPrompt = `${selectedTemplate.systemPrompt}${userInput}`;

    // Query Gemini API
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ result: text });
  } catch (error) {
    console.error("Generation Error:", error);
    return res.status(500).json({ error: "Failed to generate content. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`PromptLab server running at http://localhost:${PORT}`);
});
