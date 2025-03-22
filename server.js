const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "GOODISGOOD";
const PAGE_ACCESS_TOKEN = "EACFWeWEcersBO7u1SO1lgF59HjnAyRKCWiVa3ZC2vZAer18AFxMoBl6cZAWZBWAZCdL2S1F527tfyTK47uMpeWAO1eQSV0VmJsJIYxrlcyTgeBhqnhykiFXTJY0QAX80bfTKy1KknqEYUH6aDVvEcoZB23xBijaLY2vtTMKJBXGgWeNSe6UKI1Cdi05QBtsbSYBs7mLOHytHeFLfRwpZA97cZAU1ZCwZDZD";

// Verify Webhook
app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Handle incoming messages
app.post("/webhook", (req, res) => {
    let body = req.body;

    if (body.object === "page") {
        body.entry.forEach(entry => {
            let webhookEvent = entry.messaging[0];
            let senderId = webhookEvent.sender.id;

            if (webhookEvent.message) {
                sendMessage(senderId, "Hello! This is an automated response.");
            }
        });

        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});

// Function to send messages
function sendMessage(recipientId, text) {
    let messageData = {
        recipient: { id: recipientId },
        message: { text: text }
    };

    request({
        uri: "https://graph.facebook.com/v19.0/me/messages",
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "POST",
        json: messageData
    });
}

app.listen(3000, () => console.log("Webhook is running"));
