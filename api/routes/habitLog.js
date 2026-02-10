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

module.exports = router;