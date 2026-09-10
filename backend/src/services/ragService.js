const { similaritySearchWithScore } = require("../rag/vectorStore");
const businessProfile = require("../config/businessProfile");

/**
 * Retrieves relevant context from the vector store and determines
 * if the query should be escalated based on the similarity score.
 * 
 * @param {string} query - The user's question.
 * @returns {Promise<{context: string, escalate: boolean}>}
 */
const retrieveContext = async (query) => {
  try {
    // HNSWLib returns an array of [Document, distance_score]
    // Lower score means closer distance (higher relevance).
    const results = await similaritySearchWithScore(query, 3);

    if (!results || results.length === 0) {
      return { context: "", escalate: true };
    }

    const bestScore = results[0][1];
    
    // We invert the similarity threshold to compare it against HNSWLib's distance metric.
    // For a similarity threshold of 0.75, the max acceptable distance is roughly 0.25.
    const maxAcceptableDistance = 1 - businessProfile.rag.similarityThreshold;
    const escalate = bestScore > maxAcceptableDistance;

    // Combine the text of the retrieved chunks
    const context = results.map(([doc, _]) => doc.pageContent).join("\n\n---\n\n");

    return { context, escalate };
  } catch (error) {
    console.error("Error in RAG retrieval:", error);
    // Fail gracefully: escalate to human if RAG fails
    return { context: "", escalate: true };
  }
};

module.exports = { retrieveContext };