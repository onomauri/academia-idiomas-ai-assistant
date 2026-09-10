const cache = new Map();
const TTL = 1000 * 60 * 60; // 1 hour

/**
 * Retrieves a response from the cache if it exists and hasn't expired.
 */
const getCache = (key) => {
  const item = cache.get(key);
  if (item && item.expiry > Date.now()) {
    return item.value;
  }
  cache.delete(key);
  return null;
};

/**
 * Saves a response to the cache with an expiration time.
 */
const setCache = (key, value) => {
  cache.set(key, {
    value,
    expiry: Date.now() + TTL,
  });
};

module.exports = { getCache, setCache };