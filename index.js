const express = require("express");
const app = express();

app.use(express.json());

// Health check (Zalo + Render test sống/chết)
app.get("/", (req, res) => {
  res.status(200).send("Zalo Webhook is running OK");
});

// Webhook chính
app.post("/webhook", (req, res) => {
  try {
    // Log toàn bộ request từ Zalo
    console.log("=== ZALO WEBHOOK HIT ===");
    console.log("Headers:", req.headers);
    console.log("Body:", JSON.stringify(req.body, null, 2));

    // LUÔN trả 200 nhanh (quan trọng nhất khi xét duyệt)
    return res.status(200).json({
      error: 0,
      message: "success",
      timestamp: Date.now()
    });

  } catch (error) {
    console.error("Webhook error:", error);

    // Vẫn phải trả 200 để tránh Zalo retry fail liên tục
    return res.status(200).json({
      error: 1,
      message: "handled error"
    });
  }
});

// Handle route không tồn tại (tránh Zalo gọi nhầm bị 404)
app.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: "Not found"
  });
});

// Port chuẩn Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});