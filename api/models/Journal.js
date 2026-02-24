const mongoose = require("mongoose");
const schema = mongoose.Schema;

const journalSchema = new schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;
