const router = require("express").Router();
const Users = require("../models/Users.js");
const bcrypt = require("bcryptjs"); // https://github.com/dcodeIO/bcrypt.js#readme
const validator = require("validator"); //npm i validator (backend)
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

//console.log("JWT SECRET:", jwt_secret);

router.post("/register", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existing = await Users.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.send({ ok: false, message: "Email already registered" });
  }
  if (!email || !password || !passwordConfirmation) {
    return res.send({ ok: false, message: "All fields required" });
  }
  if (password.length < 8) {
    return res.send({
      ok: false,
      message: "Password must have at least 8 characters.",
    });
  }
  if (password !== passwordConfirmation) {
    return res.json({ ok: false, message: "Passwords must match" });
  }
  if (!validator.isEmail(email)) {
    return res.send({ ok: false, message: "Invalid Email" });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = {
      email: email.toLowerCase(),
      password: hash,
    };
    console.log(newUser);
    await Users.create(newUser);
    res.send({ ok: true, message: "Successfully registered" });
  } catch (error) {
    res.send({ ok: false, message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ ok: false, message: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res.send({ ok: false, message: "Invalid Email" });
  }
  try {
    const user = await Users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.send({ ok: false, message: "Invalid user provided" });
    }
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      //jwt_secret is a private key to verify the token on the server
      const token = jwt.sign({ userEmail: user.email }, jwt_secret, {
        expiresIn: "365days",
      });
      res.send({ ok: true, message: "Welcome back", token, email });
    } else {
      return res.send({ ok: false, message: "Invalid data provided" });
    }
  } catch (error) {
    res.send({ ok: false, error });
  }
});

router.post("/token", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "Token is corrupted" })
      : res.json({ ok: true, succ });
  });
});

module.exports = router;
