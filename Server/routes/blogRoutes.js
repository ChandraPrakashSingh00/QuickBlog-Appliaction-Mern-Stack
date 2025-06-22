const express = require("express");
const {addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments, generateContent} = require("../controllers/blogcontroller");
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");

const blogRouter = express.Router();

blogRouter.post("/add", auth, upload.single('image'), addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.post("/delete",auth, deleteBlogById);
blogRouter.post("/toggle-publish", togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);
blogRouter.post("/:blogId", getBlogById);


module.exports = blogRouter;