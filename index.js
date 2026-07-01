const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

/* ===========================================
   TRANG CHỦ
=========================================== */

app.get("/", (req, res) => {
  res.send("✅ Yeori Webhook đang hoạt động");
});

/* ===========================================
   HEALTH CHECK
=========================================== */

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server Running",
    time: new Date()
  });
});

/* ===========================================
   WEBHOOK ZALO
=========================================== */

app.post("/webhook", (req, res) => {

  console.log("========== WEBHOOK ==========");

  console.log(req.body);

  res.json({
    error: 0,
    message: "success"
  });

});

/* ===========================================
   API LƯU USER
=========================================== */

app.post("/api/save-user", async (req, res) => {

  try {

    const data = req.body;

    console.log("USER DATA:");

    console.log(data);

    const sheetAPI =
      "https://script.google.com/macros/s/AKfycbw1JX5HMvxRU6pZYucWruZPWXicAkt1B6wzvrI9NxsVoX4ntRObbrsh6DT-ms_HHD-E0w/exec";

    const result = await axios.post(
      sheetAPI,
      data
    );

    res.json({
      success: true,
      message: "Đã lưu Google Sheet",
      data: result.data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});

/* ===========================================
   TEST API
=========================================== */

app.post("/api/test", (req, res) => {

  console.log(req.body);

  res.json({

    success: true,

    data: req.body

  });

});

/* ===========================================
   PORT
=========================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("================================");

  console.log("YEORI WEBHOOK RUNNING");

  console.log("PORT:", PORT);

  console.log("================================");

});