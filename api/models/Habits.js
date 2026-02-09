const mongoose = require("mongoose");
const schema = mongoose.Schema;

const habitSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  typeofhabit: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  /*
  user: {
    type: String,
    required: true,
  },
  */
  created: {
    type: Date,
    default: Date.now,
  },
});

const Habits = mongoose.model("Habits", habitSchema);
module.exports = Habits;
