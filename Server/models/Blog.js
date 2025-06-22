const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: [
      {
        type: String, // Store image URLs or paths
      },
    ],

    isPublished: {
      type: Boolean,
      required :  true,
    },
    
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Blog", blogSchema);
