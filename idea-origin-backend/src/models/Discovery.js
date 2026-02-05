import mongoose from "mongoose";

const discoverySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    scientistId: { type: mongoose.Schema.Types.ObjectId, ref: "Scientist", required: true },
    field: { type: String, required: true },
    year: { type: Number },
    shortDescription: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Discovery = mongoose.model("Discovery", discoverySchema);
