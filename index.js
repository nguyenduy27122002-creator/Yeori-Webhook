const express = require("express");
const app = express();

// Parse JSON body
app.use(express.json());

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.status(200).send("Zalo Mini App Webhook is running OK");
});

// =========================
// WEBHOOK ENDPOINT
// =========================
app.post("/webhook", (req, res) => {
  try {
    console.log("=== ZALO WEBHOOK RECEIVED ===");
    console.log("Headers:", req.headers);
    console.log("Body:", JSON.stringify(req.body, null, 2));

    const event = req.body?.event_name;

    // =========================
    // HANDLE EVENTS (MINI APP / OA)
    // =========================
    switch (event) {

      case "app.review":
        console.log("📌 App Review Event:");
        console.log("App ID:", req.body.app_id);
        console.log("Status:", req.body.status); // approved / rejected
        break;

      case "user.delete_data":
        console.log("🗑 User delete request:");
        console.log("User ID:", req.body.user_id);
        break;

      default:
        console.log("ℹ Unknown event:", event);
    }

    // =========================
    // ALWAYS RETURN 200
    // =========================
    return res.status(200).json({
      error: 0,
      message: "success"
    });

  } catch (error) {
    console.error("Webhook error:", error);

    // Vẫn trả 200 để tránh Zalo retry fail
    return res.status(200).json({
      error: 0,
      message: "handled error"
    });
  }
});

// =========================
// START SERVER (RENDER READY)
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});