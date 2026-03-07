const router = require("express").Router();
const HabitLog = require("../models/HabitLog.js");

router.get("/gettracked/:first_day/:last_day/:owner", async (req, res) => {
  const { first_day, last_day, owner } = req.params;
  //console.log(first_day, last_day, typeof first_day, typeof last_day);
  try {
    const hab = await HabitLog.find({
      date: { $gte: first_day, $lte: last_day }, //$gte (>=), $lte (<=)
      user: owner,
    });
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.get("/gethabitsofday/:date/:owner", async (req, res) => {
  const { date, owner } = req.params;
  try {
    const hab = await HabitLog.find({ date: date, user: owner });
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.delete("/cleanlog/:date/:owner", async (req, res) => {
  const { date, owner } = req.params;
  try {
    const hablog_del = await HabitLog.deleteMany({ date: date, user: owner });
    //console.log(hablog_del);
    res.send({ ok: true, data: hablog_del });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.delete("/deletehabitlogs/:hab_id", async (req, res) => {
  const { hab_id } = req.params;
  try {
    const delhab = await HabitLog.deleteMany({ habit_id: hab_id });
    res.send({ ok: true, data: delhab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.post("/newlog", async (req, res) => {
  const { date, habit_id, habit_name, owner } = req.body;
  try {
    const newlog = {
      user: owner,
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
