const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");


// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Blogs (Admin Panel)
const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Dashboard Data
const getdashboard = async (req, res) => {
  try {
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ status: "draft" });

    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      dashboardData: {
        blogs,
        comments,
        drafts,
        recentBlogs
      }
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to load dashboard" });
  }
};


// Delete Comment by ID
const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findOneAndDelete({ _id: id });
    res.json({ success: true, message: "Comment Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Approve Comment by ID
const approvedCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findOneAndUpdate({ _id: id }, { isApproved: true });
    res.json({ success: true, message: "Comment Approved Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllBlogsAdmin,
  getAllComments,
  getdashboard,
  deleteCommentById,
  approvedCommentById,
};
