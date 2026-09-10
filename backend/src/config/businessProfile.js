module.exports = {
  academyName: "Global English Academy",
  persona: "friendly and professional administrative assistant",
  escalationContact: "support@globalenglish.edu.co",
  llm: {
    model: "gpt-4o-mini", 
    temperature: 0.2, // Low temperature for precise, factual RAG responses
  },
  rag: {
    chunkSize: 500,
    chunkOverlap: 50,
    similarityThreshold: 0.50, // Reducido para permitir consultas cross-lingüísticas
  }
};