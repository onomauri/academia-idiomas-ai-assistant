const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const businessProfile = require("../config/businessProfile");

/**
 * Splits raw documents into smaller chunks with overlap.
 * @param {Array} documents - LangChain document objects
 * @returns {Promise<Array>} Chunks of split documents
 */
const splitDocuments = async (documents) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: businessProfile.rag.chunkSize,
    chunkOverlap: businessProfile.rag.chunkOverlap,
  });

  return await splitter.splitDocuments(documents);
};

module.exports = { splitDocuments };