import { DiscoveryStory } from "../models/DiscoveryStory.js";

// Get all discovery stories
export const getAllDiscoveryStories = async (req, res) => {
  try {
    const stories = await DiscoveryStory.find({});
    res.status(200).json({ success: true, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single discovery story by id
export const getDiscoveryStoryById = async (req, res) => {
  try {
    const story = await DiscoveryStory.findOne({ id: req.params.id });
    if (!story) return res.status(404).json({ success: false, message: "Discovery Story not found" });
    res.status(200).json({ success: true, data: story });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get stories by scientistId
export const getStoriesByScientist = async (req, res) => {
  try {
    const stories = await DiscoveryStory.find({ scientistId: req.params.scientistId });
    res.status(200).json({ success: true, data: stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
