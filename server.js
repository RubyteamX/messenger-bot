const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// VERIFY TOKEN (Must match Facebook settings)
const VERIFY_TOKEN = "GOODISGOOD";

// Webhook endpoint
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook request received!");
  console.log("Mode:", mode);
  console.log("Token received:", token);
  console.log("Expected Token:", VERIFY_TOKEN);

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED!");
    res.status(200).send(challenge); // Send challenge back
  } else {
    console.log("WEBHOOK VERIFICATION FAILED!");
    res.sendStatus(403);
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Messenger Bot is live! 🚀");
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
