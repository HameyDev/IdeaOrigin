import mongoose from "mongoose";

// Subdocument schema for each content section
const contentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  text: { type: String, required: true },
});

// Main Discovery Story schema
const discoveryStorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // like "relativity"
  title: { type: String, required: true },
  scientist: { type: String, required: true },
  scientistId: { type: String, required: true },
  year: { type: String, required: true },
  image: { type: String },
  content: [contentSchema],
});

export const DiscoveryStory = mongoose.model(
  "DiscoveryStory",
  discoveryStorySchema
);
