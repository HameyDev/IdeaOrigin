import { DiscoveryStory } from "../models/DiscoveryStory.js";
import { Discovery } from "../models/Discovery.js";

/**
 * GET discovery story by discoveryId
 * GET /api/discovery-stories/:discoveryId
 */
export const getStoryByDiscoveryId = async (req, res) => {
  try {
    const { discoveryId } = req.params;

    const story = await DiscoveryStory.findOne({ discoveryId })
      .populate("discoveryId")
      .populate("scientistId", "name field image");

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    res.status(200).json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * CREATE discovery story
 * POST /api/discovery-stories
 */
export const createDiscoveryStory = async (req, res) => {
  try {
    const { discoveryId } = req.body;

    // ensure discovery exists
    const discovery = await Discovery.findById(discoveryId);
    if (!discovery) {
      return res.status(404).json({ success: false, message: "Discovery not found" });
    }

    const story = new DiscoveryStory(req.body);
    await story.save();

    res.status(201).json({
      success: true,
      message: "Discovery story created",
      data: story,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * UPDATE discovery story
 * PUT /api/discovery-stories/:id
 */
export const updateDiscoveryStory = async (req, res) => {
  try {
    const updated = await DiscoveryStory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    res.status(200).json({
      success: true,
      message: "Story updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE discovery story
 * DELETE /api/discovery-stories/:id
 */
export const deleteDiscoveryStory = async (req, res) => {
  try {
    const deleted = await DiscoveryStory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    res.status(200).json({
      success: true,
      message: "Story deleted",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
