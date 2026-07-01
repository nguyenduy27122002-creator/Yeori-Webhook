const express = require("express");

const app = express();

app.use(express.json());

/* =========================
   HOME CHECK
========================= */
app.get("/", (req, res) => {
  res.send("✅ Yeori Webhook đang hoạt động");
});

/* =========================
   NHẬN DATA TỪ MINI APP
========================= */
app.post("/api/zalo-user", (req, res) => {
  try {
    const { userInfo, phoneCode } = req.body;

    console.log("========== NEW ZALO USER ==========");

    console.log("USER INFO:", userInfo);

    console.log("PHONE CODE:", phoneCode);

    res.json({
      success: true,
      message: "Received successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("================================");
  console.log("YEORI WEBHOOK RUNNING");
  console.log("PORT:", PORT);
  console.log("================================");
});