const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    address: { type: String, required: true },
    profilePicture: { type: String, default: "images/default-avatar.png" },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
