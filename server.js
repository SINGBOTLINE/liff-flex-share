const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const LINE_ACCESS_TOKEN = "ใส่ Channel Access Token ของคุณที่นี่";

app.post("/push-flex", async (req, res) => {
  const { userId, imageUrl, lineId } = req.body;
  if (!userId || !imageUrl || !lineId) {
    return res.status(400).json({ status: "error", message: "Missing fields" });
  }

  const flexMsg = {
    to: userId,
    messages: [
      {
        type: "flex",
        altText: "FLEX ฟรี สนใจติดต่อ ID: mc357.com",
        contents: {
          type: "carousel",
          contents: [
            {
              type: "bubble",
              size: "giga",
              hero: {
                type: "image",
                url: imageUrl,
                size: "full",
                aspectRatio: "2:3",
                aspectMode: "cover",
                action: { type: "uri", uri: "https://line.me/ti/p/~" + lineId }
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  { type: "text", text: "FLEX ฟรี", weight: "bold", size: "xl", color: "#0ff" },
                  { type: "text", text: "สนใจติดต่อ ID: mc357.com", size: "md", margin: "md", color: "#fff" }
                ]
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    style: "primary",
                    label: "ติดต่อผู้สร้าง",
                    action: { type: "uri", uri: "https://line.me/ti/p/~mc357.com" }
                  }
                ],
                backgroundColor: "#000"
              }
            }
          ]
        }
      }
    ]
  };

  try {
    await axios.post("https://api.line.me/v2/bot/message/push", flexMsg, {
      headers: { Authorization: "Bearer " + LINE_ACCESS_TOKEN }
    });
    res.json({ status: "success" });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ status: "error", message: "Push failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));