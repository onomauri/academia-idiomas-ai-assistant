const metrics = {
  totalQueries: 0,
  escalatedQueries: 0,
  cacheHits: 0,
};

/**
 * Updates the metrics counters based on the outcome of a query.
 */
const recordQuery = (escalated = false, cacheHit = false) => {
  metrics.totalQueries += 1;
  if (escalated) metrics.escalatedQueries += 1;
  if (cacheHit) metrics.cacheHits += 1;
};

/**
 * Retrieves the current metrics state.
 */
const getMetrics = () => metrics;

module.exports = { recordQuery, getMetrics };