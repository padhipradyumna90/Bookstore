const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

// Add book to cart
router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.body;
    const userId = req.user.id || req.user._id;

    const userdata = await User.findById(userId);
    if (!userdata) return res.status(404).json({ message: "User not found" });

    if (userdata.cart.includes(bookid)) {
      return res.status(200).json({ message: "Book is already in Cart" });
    }

    await User.findByIdAndUpdate(userId, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book added to Cart" });
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Remove book from cart
router.put("/remove-book-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const userId = req.user.id || req.user._id;

    await User.findByIdAndUpdate(userId, { $pull: { cart: bookid } });
    return res.status(200).json({ message: "Book removed from Cart" });
  } catch (error) {
    console.error("Error removing book from cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get cart for authenticated user
router.get("/get-cart-for-user", authenticateToken, async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const userId = req.user.id;
    console.log("userId:", userId);
    const userdata = await User.findById(userId).populate("cart");
    if (!userdata) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userdata.cart.reverse());
  } catch (error) {
    console.error("Error in get-cart-for-user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
