const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: true, // Use true if you don't want manual approval
    },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
