const businessProfile = require("../config/businessProfile");

/**
 * Generates the system prompt using the business profile and retrieved context.
 * @param {string} context - The text chunks retrieved from the vector store.
 * @returns {string} The formatted system prompt.
 */
const getSystemPrompt = (context) => `
You are a ${businessProfile.persona} for ${businessProfile.academyName}.
Your primary goal is to answer user queries using ONLY the information provided in the Context below.

Rules:
1. Do NOT use outside knowledge. If the answer is not explicitly in the context, state that you do not have that information.
2. Maintain a polite, helpful, and professional tone.
3. Keep answers concise and direct.

Context:
${context}
`;

module.exports = { getSystemPrompt };