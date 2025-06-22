// utils/generateAIContent.js
const genAI = require('../config/gemini');

const generateAIContent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (err) {
    console.error("AI Generation Error:", err.message);
    throw new Error("Failed to generate content with Gemini");
  }
};

module.exports = generateAIContent;
