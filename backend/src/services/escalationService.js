const businessProfile = require("../config/businessProfile");

/**
 * Generates a standard escalation message directing the user to a human agent.
 * @returns {string} The escalation message.
 */
const getEscalationMessage = () => {
  return `I currently don't have that information. I have forwarded your request to our team, or you can directly reach out to ${businessProfile.escalationContact}.`;
};

module.exports = { getEscalationMessage };