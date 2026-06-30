const express = require("express");
const app = express();

app.use(express.json());

// Trang test
app.get("/", (req, res) => {
  res.send("Webhook Zalo đang chạy OK");
});

// Webhook nhận dữ liệu
app.post("/webhook", (req, res) => {
  console.log("Nhận dữ liệu:", req.body);

  res.json({ status: "ok" });
});

// Port chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server chạy cổng", PORT);
});