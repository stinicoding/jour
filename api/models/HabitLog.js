const mongoose = require("mongoose");
const schema = mongoose.Schema;

const habitLogSchema = new schema({
  /*user: {
    type: String,
    required: true,
  },
  */
  date: {
    type: Date,
    required: true,
  },
  habit_id: {
    type: String,
    required: true,
  },
  habit_name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const HabitLog = mongoose.model("HabitLog", habitLogSchema);
module.exports = HabitLog;
