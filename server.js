// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const FILE = 'whitelist.json';

// โหลด whitelist จากไฟล์
function loadWhitelist() {
  if (!fs.existsSync(FILE)) return [];
  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
}

// บันทึก whitelist ลงไฟล์
function saveWhitelist(list) {
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
}

// GET whitelist
app.get('/whitelist', (req, res) => {
  const list = loadWhitelist();
  res.json(list);
});

// POST เพิ่ม user
app.post('/whitelist', (req, res) => {
  const { name, userId } = req.body;
  if (!name || !userId) return res.status(400).json({ error: 'name and userId required' });
  const list = loadWhitelist();
  if (list.some(u => u.userId === userId)) return res.status(400).json({ error: 'userId already exists' });
  list.push({ name, userId });
  saveWhitelist(list);
  res.json({ success: true, list });
});

// DELETE user
app.delete('/whitelist', (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  let list = loadWhitelist();
  list = list.filter(u => u.userId !== userId);
  saveWhitelist(list);
  res.json({ success: true, list });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});