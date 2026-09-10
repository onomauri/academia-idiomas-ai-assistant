const { retrieveContext } = require("../services/ragService");
const { generateAnswer } = require("../services/llmService");
const { getEscalationMessage } = require("../services/escalationService");
const { getCache, setCache } = require("../services/cacheService");
const { recordQuery } = require("../services/metricsService");

const handleQuery = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 1. Check cache first to save API costs
    const cachedResponse = getCache(message);
    if (cachedResponse) {
      recordQuery(cachedResponse.escalate, true);
      return res.json(cachedResponse);
    }

    // 2. Retrieve relevant chunks from HNSWLib
    const { context, escalate } = await retrieveContext(message);

    let answer;
    
    // 3. Decide whether to answer or escalate
    if (escalate) {
      answer = getEscalationMessage();
    } else {
      answer = await generateAnswer(message, context);
    }

    const responsePayload = { answer, escalate };

    // 4. Save to cache and update metrics
    setCache(message, responsePayload);
    recordQuery(escalate, false);

    return res.json(responsePayload);
  } catch (error) {
    console.error("Controller Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleQuery };