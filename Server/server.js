const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./config/db");

// Routes
const adminRouter = require("./routes/adminRoutes");
const blogRouter = require("./routes/blogRoutes");

const Port = process.env.Port || 3000;

// Connect DB
connectToDB();

// Middleware 
app.use(cors());
app.use(express.json());

// Server static files from "uploads" folder
app.use("/upload", express.static("upload")); // <- Missing in your code

// Test Route
app.get("/", (req, res) => {
    res.send("Hello");
});

// API Routes
app.use('/api/admin', adminRouter);
app.use("/api/blog", blogRouter);

// Start server
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
