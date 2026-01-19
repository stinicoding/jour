const router = require("express").Router();
const Habits = require("../models/Habits.js");

router.post("/newhabit", async (req, res) => {
  const { name, typeofhabit } = req.body;
  console.log(name);
  console.log(typeofhabit);
  try {
    const newHabit = { name: name, typeofhabit: typeofhabit };
    const hab = await Habits.create(newHabit);
    console.log(hab);
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

module.exports = router;
