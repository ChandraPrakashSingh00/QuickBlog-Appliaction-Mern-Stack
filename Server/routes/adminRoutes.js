const express = require("express");
const {
  adminLogin,
  getAllBlogsAdmin,
  getAllComments,
  getdashboard,
  deleteCommentById,
  approvedCommentById,
} = require("../controllers/adminController");
const auth = require("../middleware/auth");

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approvedCommentById);
adminRouter.get("/dashboard", auth, getdashboard);


module.exports = adminRouter;
