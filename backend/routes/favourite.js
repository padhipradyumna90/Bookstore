const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

// Add book to favourites list
router.put("/add-book-to-favourites", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.body;
    const userId = req.user?.id; // From authenticateToken middleware

    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favourites.includes(bookid)) {
      return res.status(200).json({ message: "Book is already in Favourites" });
    }

    user.favourites.push(bookid);
    await user.save();

    return res.status(200).json({ message: "Book added to Favourites" });
  } catch (error) {
    console.error("Internal Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// Remove book from favourites list
router.put("/remove-book-from-favourites/:id", authenticateToken,async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        return res.status(200).json({ message: "Book removed from Favourites" });

    } catch (error) {
        console.error("Internal Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get favourite books for a particular user
router.get("/get-favourite-books/:id",authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate("favourites");

        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        const favouriteBooks = userdata.favourites;
        return res.status(200).json({ favourites: favouriteBooks });

    } catch (error) {
        console.error("Internal Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
