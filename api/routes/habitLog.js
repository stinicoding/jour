const router = require("express").Router();
const HabitLog = require("../models/HabitLog.js");

router.get("/gettracked/:first_day/:last_day", async (req, res) => {
  const { first_day, last_day } = req.params;
  //console.log(first_day, last_day, typeof first_day, typeof last_day);
  try {
    const hab = await HabitLog.find({
      date: { $gte: first_day, $lte: last_day }, //$gte (>=), $lte (<=)
    });
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.get("/gethabitsofday/:date", async (req, res) => {
  try {
    const hab = await HabitLog.find({ date: req.params.date });
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.post("/newlog", async (req, res) => {
  const { date, habit_id, habit_name } = req.body;
  try {
    const newlog = {
      date: date,
      habit_id: habit_id,
      habit_name: habit_name,
    };
    const hablog = await HabitLog.create(newlog);
    res.send({ ok: true, data: hablog });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

module.exports = router;
