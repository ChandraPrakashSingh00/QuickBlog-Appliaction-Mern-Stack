const fs = require("fs");
const imagekit = require("../config/imageKit");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const { main } = require("../config/gemini");
const generateAIContent = require("../utils/generateAIContent");


const addBlog = async(req, res) =>{
    try{
        const {title, subtitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all Fields are present
        if(!title || !description ||!category ||!imageFile){
            return res.json({success: false, message: "Missing required fields"});
        }

        // Upload Image to ImageKite
        const fileBuffer = fs.readFileSync(imageFile.path); 
        const response =  await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Optimization Through imagekite URL transformation
        const OptimizationImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, // Auto Compressions
                {format: 'webp'}, // Convert to modern format
                {width: '1280'} // Width resizing
            ]
        })
        
        const image = OptimizationImageUrl;

        await Blog.create({title, subtitle, description, category, image, isPublished});
        res.json({success: true, message: "Blog added successfully"});
        
    }
    catch(error){
          res.json({success: false, message: error.message});
    }
}

const getAllBlogs = async(req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs }); // ✅ updated from message to blogs
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const getBlogById = async(req, res) =>{
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
           return res.json({success: false, message: "Blog not found"})
        }
        res.json({success: true, blog});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const deleteBlogById = async(req, res) =>{
  try {
    const { id } = req.body;

    await Blog.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: "Blog Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    const newComment = await Comment.create({
      blog,
      name,
      content,
    });

    res.json({ success: true, message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

const getBlogComments = async(req, res) =>{
    try{
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments});
    }
    catch(error){
        res.json({success: false, message: error.message});
 }

}
const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const fullPrompt = `${prompt}. Generate a blog content for this topic in simple words.`;
    const contentText = await generateAIContent(fullPrompt);

    res.json({ success: true, content: contentText });
  } catch (error) {
    console.error("generateContent Error:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};


module.exports = {addBlog, getAllBlogs, getBlogById, generateContent, deleteBlogById, togglePublish, addComment, getBlogComments}