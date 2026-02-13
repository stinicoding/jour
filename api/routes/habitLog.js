const router = require("express").Router();
const HabitLog = require("../models/HabitLog.js");

router.get("/", async (req, res) => {
  try {
    const hab = await HabitLog.find();
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.post("/newlog", async (req, res) => {
  const { date,
          habit_id,
          habit_name } = req.body
  try {
    const newlog = {
      date: date,
      habit_id: habit_id,
      habit_name: habit_name,
    }
    const hablog = await HabitLog.create(newlog)
    res.send({ok: true, data: hablog})
  } catch(error) {
    res.send({ok: false, message: error})
  }
})

module.exports = router;