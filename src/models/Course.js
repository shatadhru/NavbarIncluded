import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, default: "Unknown" },
  price: { type: Number, default: 0 },
  regularPrice: { type: Number, default: 0 },
  moreInfo: { type: String },
  status: { type: String, enum: ["Active", "Inactive", "Upcoming"], default: "Upcoming" },
  image: { type: String, default: "https://via.placeholder.com/80" },
  categories: { type: [String], default: [] },
  introVideo: { type: String, default: "" },
  visibility: { type: String, enum: ["public", "password-protected", "private"], default: "public" },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", courseSchema);