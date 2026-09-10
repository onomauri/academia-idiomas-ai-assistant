const OpenAI = require("openai");
const env = require("../config/env");
const businessProfile = require("../config/businessProfile");
const { getSystemPrompt } = require("../prompts/systemPrompt");
const { fewShotExamples } = require("../prompts/fewShotExamples");

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

/**
 * Generates an answer using the OpenAI Responses API based on the retrieved context.
 * 
 * @param {string} query - The user's original question.
 * @param {string} context - The retrieved document chunks.
 * @returns {Promise<string>} The generated text answer.
 */
const generateAnswer = async (query, context) => {
  try {
    const systemMessage = {
      role: "system",
      content: getSystemPrompt(context),
    };

    const userMessage = {
      role: "user",
      content: query,
    };

    const messageList = [systemMessage, ...fewShotExamples, userMessage];

    // Using the updated Responses API format
    const response = await openai.responses.create({
      model: businessProfile.llm.model,
      input: messageList, // Fixed: Changed from 'messages' to 'input'
      temperature: businessProfile.llm.temperature,
    });

    // Extract only the clean text from the new structure.
    if (response.output && response.output.length > 0) {
      return response.output[0].content[0].text;
    }
    
    // Fallback por si la estructura cambia inesperadamente
    throw new Error("Unexpected response structure from OpenAI Responses API");

  } catch (error) {
    console.error("Error in LLM generation:", error.message);
    throw new Error("Failed to generate response from OpenAI");
  }
};

module.exports = { generateAnswer };
