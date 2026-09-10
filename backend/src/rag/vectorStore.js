const path = require("path");
const fs = require("fs");
const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");
const { OpenAIEmbeddings } = require("@langchain/openai");
const env = require("../config/env");

const VECTOR_STORE_DIR = path.join(__dirname, "../data/vector-store");

const getEmbeddings = () => {
  return new OpenAIEmbeddings({
    openAIApiKey: env.OPENAI_API_KEY,
    modelName: "text-embedding-3-small",
  });
};

/**
 * Creates and saves an HNSWLib vector index to disk.
 * @param {Array} docs - Array of chunked documents
 */
const saveVectorStore = async (docs) => {
  const embeddings = getEmbeddings();
  const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
  await vectorStore.save(VECTOR_STORE_DIR);
  return vectorStore;
};

/**
 * Loads an existing HNSWLib vector store from disk.
 * @returns {Promise<HNSWLib|null>}
 */
const loadVectorStore = async () => {
  if (!fs.existsSync(path.join(VECTOR_STORE_DIR, "args.json"))) {
    return null;
  }
  const embeddings = getEmbeddings();
  return await HNSWLib.load(VECTOR_STORE_DIR, embeddings);
};

/**
 * Performs similarity search with distance score.
 * Lower distance in HNSWLib means higher relevance.
 * @param {string} query
 * @param {number} k - Number of chunks to retrieve
 */
const similaritySearchWithScore = async (query, k = 3) => {
  const store = await loadVectorStore();
  if (!store) {
    throw new Error("Vector store not initialized. Run ingestion first.");
  }
  return await store.similaritySearchWithScore(query, k);
};

module.exports = {
  saveVectorStore,
  loadVectorStore,
  similaritySearchWithScore,
};