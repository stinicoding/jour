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

module.exports = router;
