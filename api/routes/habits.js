const router = require("express").Router();
const Habits = require("../models/Habits.js");

router.get("/", async (req, res) => {
  try {
    const goodhab = await Habits.find({ typeofhabit: "good" });
    const badhab = await Habits.find({ typeofhabit: "bad" });
    res.send({ ok: true, good: goodhab, bad: badhab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.post("/newhabit", async (req, res) => {
  const { name, typeofhabit, color } = req.body;
  //console.log(name);
  //console.log(typeofhabit);
  try {
    const newHabit = { name: name, typeofhabit: typeofhabit, color: color };
    const hab = await Habits.create(newHabit);
    //console.log(hab);
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.patch("/updatehabit", async (req, res) => {
  const { name, typeofhabit, color } = req.body;
  try {
    const hab = await Habits.findOneAndUpdate(
      { name: name },
      { name: name, typeofhabit: typeofhabit, color: color },
    );
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.delete("/deletehabit/:hab", async (req, res) => {
  const { hab } = req.params;
  try {
    const delhab = await Habits.findOneAndDelete({ name: hab });
    res.send({ ok: true, data: delhab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

module.exports = router;
