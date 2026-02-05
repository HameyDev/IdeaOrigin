import mongoose from "mongoose";

// Subdocument schema for story sections
const contentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  text: { type: String, required: true },
});

// Main Discovery Story schema
const discoveryStorySchema = new mongoose.Schema(
  {
    discoveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discovery",
      required: true,
      unique: true, // one story per discovery
    },
    scientistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scientist",
      required: true,
    },
    image: { type: String }, // Featured image for the story page
    content: [contentSchema],
    impact: { type: [String], default: [] },
    references: { type: [String], default: [] },
    timeline: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const DiscoveryStory = mongoose.model( "DiscoveryStory", discoveryStorySchema );
