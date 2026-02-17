import multer from "multer";
import path from "path";

import { Discovery } from "../models/Discovery.js";
import Scientist from "../models/Scientist.js";

/**
 * GET all discoveries
 * GET /api/discoveries
 */
export const getAllDiscoveries = async (req, res) => {
  try {
    const discoveries = await Discovery.find()
      .populate("scientistId", "name field image")
      .sort({ year: -1 });

    res.status(200).json({
      success: true,
      count: discoveries.length,
      data: discoveries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET single discovery by ID
 * GET /api/discoveries/:id
 */
export const getDiscoveryById = async (req, res) => {
  try {
    const { id } = req.params;

    const discovery = await Discovery.findById(id).populate(
      "scientistId",
      "name field image bio"
    );

    if (!discovery) {
      return res.status(404).json({ success: false, message: "Discovery not found" });
    }

    res.status(200).json({ success: true, data: discovery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET discoveries by scientist
 * GET /api/discoveries/scientist/:scientistId
 */
export const getDiscoveriesByScientist = async (req, res) => {
  try {
    const { scientistId } = req.params;

    const discoveries = await Discovery.find({ scientistId }).sort({ year: -1 });

    res.status(200).json({
      success: true,
      count: discoveries.length,
      data: discoveries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * CREATE discovery
 * POST /api/discoveries
 */
export const createDiscovery = async (req, res) => {
  try {
    const { title, field, year, shortDescription, scientistId } = req.body;

    if (!scientistId) {
      return res.status(400).json({ success: false, message: "ScientistId is required" });
    }

    const scientist = await Scientist.findById(scientistId);
    if (!scientist) {
      return res.status(404).json({ success: false, message: "Scientist not found" });
    }

    const image = req.file ? `/uploads/discoveries/${req.file.filename}` : "";

    const newDiscovery = new Discovery({
      title,
      field,
      year,
      shortDescription,
      scientistId,
      image,
    });

    await newDiscovery.save();

    res.status(201).json({
      success: true,
      message: "Discovery created successfully",
      data: newDiscovery,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * UPDATE discovery
 * PUT /api/discoveries/:id
 */
export const updateDiscovery = async (req, res) => {
  try {
    const updated = await Discovery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Discovery not found" });
    }

    res.status(200).json({
      success: true,
      message: "Discovery updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE discovery
 * DELETE /api/discoveries/:id
 */
export const deleteDiscovery = async (req, res) => {
  try {
    const deleted = await Discovery.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Discovery not found" });
    }

    res.status(200).json({
      success: true,
      message: "Discovery deleted",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
