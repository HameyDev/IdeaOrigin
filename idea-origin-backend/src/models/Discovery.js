import mongoose from "mongoose";

const discoverySchema = new mongoose.Schema({
  title: { type: String, required: true },
  scientist: { type: mongoose.Schema.Types.ObjectId, ref: "Scientist" }, // reference
  field: { type: String, required: true },
  year: { type: Number },
  desc: { type: String },
  image: { type: String },
});

export const Discovery = mongoose.model("Discovery", discoverySchema);
