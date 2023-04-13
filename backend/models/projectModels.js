const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectBudget: {
    type: Number,
    required: true,
  },
  projectDuration: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
    },
  ],
});

module.exports = mongoose.model("projects", projectSchema);
