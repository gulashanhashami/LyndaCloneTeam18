const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    language: { type: String, required: true },
    duration: { type: String, required: true },
    level: [{ type: String, required: false }],
    name: { type: String, required: true },
    by: { type: String, required: false },
    fromTheCourse: { type: String, required: false },
    year: { type: String, required: true },
    skill: { type: String, required: false },
    learners: { type: String, required: true },
    totalLearners: { type: Number, required: true },
    image_url: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Course = mongoose.model("course", courseSchema);

module.exports = Course;
