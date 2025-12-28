const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    // full_img: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    // desc: { type: String, required: true },
    discount: { type: Number, required: true },
    // language: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema); 
