require('dotenv').config();

const env = {
  PORT: process.env.PORT || 3000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

if (!env.OPENAI_API_KEY) {
  console.error("CRITICAL ERROR: OPENAI_API_KEY is missing in .env file.");
  process.exit(1);
}

module.exports = env;