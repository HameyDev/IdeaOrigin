import { Discovery } from "../models/Discovery.js";

// Get all discoveries
export const getAllDiscoveries = async (req, res) => {
  try {
    const discoveries = await Discovery.find({});
    res.status(200).json({ success: true, data: discoveries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single discovery by id
export const getDiscoveryById = async (req, res) => {
  try {
    const discovery = await Discovery.findOne({ id: req.params.id });
    if (!discovery) return res.status(404).json({ success: false, message: "Discovery not found" });
    res.status(200).json({ success: true, data: discovery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get discoveries by scientistId
export const getDiscoveriesByScientist = async (req, res) => {
  try {
    const discoveries = await Discovery.find({ scientistId: req.params.scientistId });
    res.status(200).json({ success: true, data: discoveries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
