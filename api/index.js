const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4044;

app.use(require("express").urlencoded({ extended: true }));
app.use(require("express").json());

async function connectingToDB() {
  try {
    await require("mongoose").connect(process.env.MONGO);
    console.log("Connected to the DB ✅");
  } catch (error) {
    console.log("ERROR: Your DB is not running, start it up ☢️");
  }
}
connectingToDB();

//==========================================================================
app.use(
  require("cors")({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);
//==========================================================================
app.use("/api/habits", require("./routes/habits.js"));
app.use("/api/habitlog", require("./routes/habitLog.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/journal", require("./routes/journal.js"));
//==========================================================================
module.exports = app;
if (process.env.NODE_ENV !== "production") {
  // Serve static files from the dist directory
  app.use(express.static("dist"));
  // Serve index.html for all other requests
  app.get("/{*splat}", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
  // Start the server
  const port = process.env.PORT || 4044;
  app.listen(port, () => console.log("🚀 Listening on port: " + port + " 🚀"));
}
