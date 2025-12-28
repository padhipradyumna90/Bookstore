const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();
const authenticateToken = require("./userAuth");

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address, role } = req.body;

    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Validate role (only "admin" or "user" allowed)
    const allowedRoles = ["admin", "user"];
    const userRole = allowedRoles.includes(role) ? role : "user";

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      role: userRole,
    });

    return res
      .status(201)
      .json({ message: "Sign up successful", user: newUser });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password are required" });
    }

    // Checking if user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "Username Doesn't Exist!" });
    }

    // Checking if password matches
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // 🔒 Check if the user is blocked
    if (existingUser.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked. Please contact support.",
      });
    }

    // Token Generation
    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        role: existingUser.role,
      },
      "bookstore123",
      { expiresIn: "30d" }
    );

    return res
      .status(200)
      .json({ id: existingUser._id, role: existingUser.role, token: token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /getuserinformation
router.get("/getuserinformation", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "username email address role"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Update address
router.put("/updateaddress", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; // Get ID from token
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    await User.findByIdAndUpdate(id, { address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Change password 
router.put("/changepassword", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; // User ID from JWT
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new passwords are required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "New password must be at least 8 characters long" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
//delete user admin and users initiated
router.delete("/:userId", authenticateToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// ------------------------------------------ADMIN-------------------------------------------------

// Get all users (admin only)  
router.get("/getallusers", authenticateToken, async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// block or unblock user admin only
router.put("/updatestatus/:userId", authenticateToken, async (req, res) => {
  const { status } = req.body; // "active" or "blocked"

  if (!["active", "blocked"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { status },
      { new: true }
    );
    res.status(200).json({ message: "User status updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// --------------------profile edit------------------
//update profile
router.put("/update-profile", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, address } = req.body;
    const updateFields = { username, email, address };
    await User.findByIdAndUpdate(id, updateFields, { new: true });

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


//delete account user 
// Delete account (user-initiated)
router.delete("/deleteaccount", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    
    await User.findByIdAndDelete(id);

    // Optional: Log reason
    console.log(`User deleted account. Reason: ${reason}`);

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


//support
// In routes/support.js or wherever appropriate


router.post("/support", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("Support request:", { name, email, message });

    // TODO: You can store this in DB, send email, etc.
    return res.status(200).json({ message: "Support request received" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// router.put("/update-profile-picture/:userId", upload.single("profilePicture"), async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const fileName = req.file.filename;
//     await User.findByIdAndUpdate(userId, { profilePicture: fileName });
//     res.json({ success: true, message: "Profile picture updated", fileName });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to update profile picture" });
//   }
// });


module.exports = router;
