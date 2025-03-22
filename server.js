const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// VERIFY TOKEN (Change "YOUR_VERIFY_TOKEN" to your actual token)
const VERIFY_TOKEN = "GOODISGOOD";

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED!");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

app.get("/", (req, res) => {
  res.send("Messenger Bot is live! 🚀");
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});