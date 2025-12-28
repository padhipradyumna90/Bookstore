const router = require("express").Router();
const Order = require("../models/order");
const User = require("../models/user");
const Book = require("../models/book");
const authenticateToken = require("./userAuth");

// Place order
router.post("/place-order", async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();
      // Saving order
      await User.findByIdAndUpdate(id, {
        $push: {
          orders: orderDataFromDb._id,
        },
      });
      // Clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log({ message: "An error occurred" });
    return res.status(500).json({ message: "An error occurred while placing the order" });
  }
});
router.get("/get-user-orders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming authenticateToken middleware adds user info
    const userdata = await Order.find({ user: userId })  // Fetch only orders for the logged-in user
      .populate({ path: "book" })
      .sort({ createdAt: -1 });
    return res.json({
      status: "success",
      data: userdata,
    });
  } catch (error) {
    console.log("Error fetching orders:", error);
    return res.status(500).json({ message: "An error occurred while fetching user orders" });
  }
});


// Get order history for a particular user
router.get("/get-order-history",authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userdata = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const ordersData = userdata.orders.reverse();
    return res.status(200).json({ orders: ordersData });
  } catch (error) {
    console.log({ message: "An error occurred while fetching order history" });
    return res.status(500).json({ message: "An error occurred while fetching order history" });
  }
});

// Get all orders (Admin)
router.get("/get-all-orders", async (req, res) => {
  try {
    const userdata = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.json({
      status: "success",
      data: userdata,
    });
  } catch (error) {
    console.log({ message: "An error occurred" });
    return res.status(500).json({ message: "An error occurred while fetching all orders" });
  }
});

// Update order status (Admin)
router.put("/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "success",
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log({ message: "An error occurred" });
    return res.status(500).json({ message: "An error occurred while updating the status" });
  }
});

// Cancel order
router.put("/cancel-order/:id", async (req, res) => {
  try {
    const { id } = req.params; // Order ID to cancel
    const { userId } = req.headers; // User ID from headers

    // Find the order by ID
    const order = await Order.findById(id).populate("book");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure the user is the one who placed the order
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to cancel this order" });
    }

    // Cancel the order by updating its status to "Cancelled"
    order.status = "Cancelled";
    await order.save();

    // Update the user's orders to reflect the cancellation
    await User.findByIdAndUpdate(userId, {
      $pull: { orders: id },
    });

    // Optionally, restore the book to the user's cart if you want to reinstate it
    await User.findByIdAndUpdate(userId, {
      $push: { cart: order.book._id },
    });

    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while cancelling the order" });
  }
});

module.exports = router;
