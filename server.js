const express = require("express");
const line = require("@line/bot-sdk");

const app = express();
app.use(express.json());

const config = {
  channelAccessToken: "PUT_YOUR_CHANNEL_ACCESS_TOKEN_HERE", // ⬅ ใส่ token ของคุณตรงนี้
  channelSecret: "35a6a2d44ea8301d9fa6f3bf503434ec"
};

const client = new line.Client(config);

async function notify(profile) {
  const msg = {
    type: "text",
    text: `📢 มีคนขอเพิ่ม whitelist!\n👤 ชื่อ: ${profile.displayName}\n🆔 userId: ${profile.userId}`
  };
  await client.pushMessage("cbf750437c1414acc072cf55327918882", msg);
}

app.post("/whitelist-request", async (req, res) => {
  await notify(req.body);
  res.send({ ok: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));