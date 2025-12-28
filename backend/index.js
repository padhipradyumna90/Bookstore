require("dotenv").config();
const express = require("express");
const cors= require("cors")
const mongoose = require("mongoose");

const app = express();
app.use (cors())
app.use(express.json());
// Database Connection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import Routes
const user = require("./routes/user");
const Book = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

// Define Routes
app.use("/api/v1", user);
app.use("/api/v1", Book);
app.use("/api/v1", favourite);
app.use("/api/v1", cart);
app.use("/api/v1", order);


// Default Route
app.get("/", (req, res) => {
  res.send("Hello, this is my Node.js and Express server!");
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
