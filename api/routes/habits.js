const router = require("express").Router();
const Habits = require("../models/Habits.js");

router.get("/:owner", async (req, res) => {
  const { owner } = req.params;
  try {
    const goodhab = await Habits.find({ typeofhabit: "good", user: owner });
    const badhab = await Habits.find({ typeofhabit: "bad", user: owner });
    res.send({ ok: true, good: goodhab, bad: badhab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.post("/newhabit", async (req, res) => {
  const { name, typeofhabit, color, owner } = req.body;
  //console.log(name);
  //console.log(typeofhabit);
  try {
    const newHabit = {
      name: name,
      typeofhabit: typeofhabit,
      color: color,
      user: owner,
    };
    const hab = await Habits.create(newHabit);
    //console.log(hab);
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.patch("/updatehabit", async (req, res) => {
  const { name, typeofhabit, color, owner } = req.body;
  try {
    const hab = await Habits.findOneAndUpdate(
      { name: name },
      { name: name, typeofhabit: typeofhabit, color: color, user: owner },
    );
    res.send({ ok: true, data: hab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.delete("/deletehabit/:hab/:owner", async (req, res) => {
  const { hab, owner } = req.params;
  try {
    const delhab = await Habits.findOneAndDelete({ name: hab, user: owner });
    res.send({ ok: true, data: delhab });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

module.exports = router;
