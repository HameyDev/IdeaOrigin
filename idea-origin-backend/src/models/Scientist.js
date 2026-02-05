import mongoose from "mongoose";

const scientistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    field: { type: String },
    image: { type: String },

    tagline: { type: String },
    era: { type: String },
    nationality: { type: String },
    born: { type: String },
    died: { type: String },
    bio: { type: String },

    story: { type: [String], default: [] },
    impact: { type: [String], default: [] },
    quotes: { type: [String], default: [] },
    funFacts: { type: [String], default: [] },

  },
  { timestamps: true }
);

const Scientist = mongoose.model("Scientist", scientistSchema);

export default Scientist;
