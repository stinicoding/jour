const router = require("express").Router();
const Journal = require("../models/Journal.js");

router.post("/newpost", async (req, res) => {
  const { text, date, owner } = req.body;
  try {
    const newJournal = {
      text: text,
      date: date,
      user: owner,
    };
    const jour = await Journal.create(newJournal);
    //console.log(jour);
    res.send({ ok: true, data: jour });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.get("/getposts/:first_day/:last_day/:owner", async (req, res) => {
  const { first_day, last_day, owner } = req.params;
  //console.log(first_day, last_day, typeof first_day, typeof last_day);
  try {
    const jour = await Journal.find({
      date: { $gte: first_day, $lte: last_day }, //$gte (>=), $lte (<=)
      user: owner,
    });
    res.send({ ok: true, data: jour });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

module.exports = router;
