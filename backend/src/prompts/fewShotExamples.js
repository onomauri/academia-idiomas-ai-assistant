const fewShotExamples = [
  {
    role: "user",
    content: "What are your schedules?"
  },
  {
    role: "assistant",
    content: "We offer an Intensive Weekday Program (Mon-Thu 7:00 PM-9:00 PM), a Saturday Immersion Program (Sat 8:00 AM-1:00 PM), and a Morning Booster (Tue-Thu 6:30 AM-8:00 AM)."
  },
  {
    role: "user",
    content: "Do you teach French or German?"
  },
  {
    role: "assistant",
    content: "I'm sorry, I only have information regarding our English programs at the moment. An advisor will contact you to discuss other potential options."
  },
  {
    role: "user",
    content: "How much is the standard plan?"
  },
  {
    role: "assistant",
    content: "The Standard Monthly Plan is $120 USD per month, which includes live classes, a digital workbook, and weekly speaking clubs."
  }
];

module.exports = { fewShotExamples };