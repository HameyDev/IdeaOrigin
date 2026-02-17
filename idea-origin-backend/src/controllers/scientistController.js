import Scientist from "../models/Scientist.js";
import { Discovery } from "../models/Discovery.js";

/**
 * GET all scientists
 * GET /api/scientists
 */
export const getAllScientists = async (req, res) => {
  try {
    const scientists = await Scientist.find().sort({ name: 1 }); // alphabetically
    res.status(200).json({
      success: true,
      count: scientists.length,
      data: scientists,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET single scientist by ID
 * GET /api/scientists/:id
 */
export const getScientistById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid Scientist ID" });
    }

    const scientist = await Scientist.findById(id);
    if (!scientist) {
      return res.status(404).json({ success: false, message: "Scientist not found" });
    }

    // Optional: fetch discoveries by this scientist
    const discoveries = await Discovery.find({ scientistId: id }).select("title year image");

    res.status(200).json({
      success: true,
      data: { ...scientist.toObject(), discoveries },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * CREATE a new scientist
 * POST /api/scientists
 */
export const createScientist = async (req, res) => {
  try {
    const data = { ...req.body };

    // If image uploaded via multer
    if (req.file) {
      data.image = `/uploads/scientists/${req.file.filename}`;
    }

    const newScientist = new Scientist(data);
    await newScientist.save();

    res.status(201).json({
      success: true,
      message: "Scientist created successfully",
      data: newScientist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * UPDATE a scientist
 * PUT /api/scientists/:id
 */
export const updateScientist = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (req.file) {
      data.image = `/uploads/scientists/${req.file.filename}`;
    }

    const updatedScientist = await Scientist.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedScientist) {
      return res.status(404).json({ success: false, message: "Scientist not found" });
    }

    res.status(200).json({
      success: true,
      message: "Scientist updated successfully",
      data: updatedScientist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * DELETE a scientist
 * DELETE /api/scientists/:id
 */
export const deleteScientist = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedScientist = await Scientist.findByIdAndDelete(id);

    if (!deletedScientist) {
      return res.status(404).json({ success: false, message: "Scientist not found" });
    }

    res.status(200).json({
      success: true,
      message: "Scientist deleted successfully",
      data: deletedScientist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
