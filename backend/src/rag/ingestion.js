const fs = require("fs");
const path = require("path");
const { Document } = require("@langchain/core/documents");
const { splitDocuments } = require("./chunking");
const { saveVectorStore } = require("./vectorStore");

const DOCUMENTS_DIR = path.join(__dirname, "../data/documents");

/**
 * Loads all text files from the data/documents directory,
 * applies chunking, and persists the HNSWLib vector store.
 */
const runIngestion = async () => {
  try {
    console.log("Starting document ingestion process...");

    const files = fs.readdirSync(DOCUMENTS_DIR).filter((file) => file.endsWith(".txt"));

    if (files.length === 0) {
      throw new Error("No .txt documents found in " + DOCUMENTS_DIR);
    }

    const rawDocuments = files.map((file) => {
      const filePath = path.join(DOCUMENTS_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");
      return new Document({
        pageContent: content,
        metadata: { source: file },
      });
    });

    console.log(`Loaded ${rawDocuments.length} documents. Splitting into chunks...`);
    const chunkedDocs = await splitDocuments(rawDocuments);
    console.log(`Generated ${chunkedDocs.length} chunks. Generating embeddings and saving to disk...`);

    await saveVectorStore(chunkedDocs);
    console.log("Vector store successfully created and saved in data/vector-store/");
  } catch (error) {
    console.error("Ingestion failed:", error);
    process.exit(1);
  }
};

runIngestion();