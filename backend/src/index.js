const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const env = require("./config/env");
const queryRoutes = require("./routes/query.route");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/query", queryRoutes);

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 AI Assistant Backend running on http://localhost:${env.PORT}`);
});