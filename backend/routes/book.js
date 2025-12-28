const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");
const Book = require("../models/book");

// Add book - Admin only
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    // Optional admin check
    // if (!user || user.role !== "admin") {
    //   return res.status(403).json({ message: "Unauthorized Access" });
    // }

    // console.log("Request Body:", req.body);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      // desc: req.body.desc,
      category: req.body.category,
      url: req.body.url
    });

    try {
      await book.save();
    } catch (err) {
      console.error("Save Error:", err);
      return res.status(400).json({ message: "Error saving book", error: err.message });
    }

    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// Update book - Admin only
router.put("/update-book/:bookId", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { id } = req.user; // From token

    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    const updated = await Book.findByIdAndUpdate(
      bookId,
      {
        // full_img: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        discount: req.body.discount,
        desc: req.body.desc,
        // language: req.body.language,
        category: req.body.category,
        url: req.body.url
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book: updated });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "An Error Occurred", error: error.message });
  }
});



// Delete book - Admin only
router.delete("/delete-book/:bookId", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.params;
    const { id } = req.user; // From token

    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "An Error Occurred", error: error.message });
  }
});


  // Get all books
router.get("/all-books", async (req, res) => {
    try {
      const books = await Book.find().sort({"createdAt": -1});
      return res.json({ status: "Success",data:books, });
    } catch (error) {
      res.status(500).json({ message: "An Error Occurred", error: error.message });
    }
  
});

//discountdeals
// Fetch books with more than 30% discount
router.get('/discount-books', async (req, res) => {
  try {
    // Query for books with discounts greater than 30%
    const discountedBooks = await Book.find({ 
      discountPrice: { $exists: true },
      discountPercentage: { $gte: 30 }  // Assuming discountPercentage is a field in the schema
    }).select('title author price discountPrice discountPercentage image');  // Only select necessary fields

    if (!discountedBooks || discountedBooks.length === 0) {
      return res.status(404).json({ message: 'No discounted books found' });
    }

    return res.status(200).json({
      data: discountedBooks,
    });
  } catch (err) {
    console.error("Error fetching discounted books:", err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Example route in Express to fetch books by category
// Express.js route example
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  // console.log("Category received:", category);
  try {
   
    const books = await Book.find({ category: category });
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found in this category" });
    }
    res.json(books);
  } catch (err) {
    console.error("Error fetching books by category:", err);
    res.status(500).json({ error: "Error fetching books by category" });
  }
});

// GET /api/v1/:bookId
router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// serach books 
router.get("/search-books", async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json({ books });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
