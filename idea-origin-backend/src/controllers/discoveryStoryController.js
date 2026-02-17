import mongoose from "mongoose";
import { DiscoveryStory } from "../models/DiscoveryStory.js";
import { Discovery } from "../models/Discovery.js";


/**
 * GET all discovery stories
 * GET /api/discovery-stories
 */
export const getAllDiscoveryStories = async (req, res) => {
  try {
    const stories = await DiscoveryStory.find()
      .populate("discoveryId", "title field")
      .populate("scientistId", "name field");
    res.status(200).json({ success: true, count: stories.length, data: stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET discovery story by discoveryId
 * GET /api/discovery-stories/:discoveryId
 */
export const getStoryByDiscoveryId = async (req, res) => {
  try {
    const { discoveryId } = req.params;

    console.log("PARAM discoveryId =", discoveryId);

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(discoveryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid discoveryId",
      });
    }

    const story = await DiscoveryStory.findOne({
      discoveryId: new mongoose.Types.ObjectId(discoveryId),
    })
      .populate("discoveryId", "title field")
      .populate("scientistId", "name field image");

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "No story found for this discovery",
      });
    }

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error("ERROR in getStoryByDiscoveryId:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * CREATE discovery story
 * POST /api/discovery-stories
 */
export const createDiscoveryStory = async (req, res) => {
  try {
    const { discoveryId, content, impact, references, timeline } = req.body;

    // 1️⃣ Validate discoveryId
    if (!mongoose.Types.ObjectId.isValid(discoveryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid discoveryId",
      });
    }

    // 2️⃣ Check discovery exists
    const discovery = await Discovery.findById(discoveryId);
    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    // 3️⃣ Prevent duplicate story (one story per discovery)
    const existing = await DiscoveryStory.findOne({ discoveryId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Story already exists for this discovery",
      });
    }

    // 4️⃣ Clean content sections
    let cleanedContent = [];
    if (Array.isArray(content)) {
      cleanedContent = content
        .map(c => ({
          section: c.section?.trim(),
          text: c.text?.trim(),
        }))
        .filter(c => c.section && c.text);
    }

    // 5️⃣ Create story with AUTO values from Discovery
    const story = new DiscoveryStory({
      discoveryId: discovery._id,
      scientistId: discovery.scientistId,   // auto
      image: discovery.image,               // 🔥 auto image from discovery
      content: cleanedContent,
      impact: Array.isArray(impact) ? impact : [],
      references: Array.isArray(references) ? references : [],
      timeline: Array.isArray(timeline) ? timeline : [],
    });

    await story.save();

    // 6️⃣ Return populated story
    const populatedStory = await DiscoveryStory.findById(story._id)
      .populate("discoveryId", "title field year image")
      .populate("scientistId", "name field image");

    res.status(201).json({
      success: true,
      message: "Discovery story created successfully",
      data: populatedStory,
    });

  } catch (error) {
    console.error("CREATE DISCOVERY STORY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * UPDATE discovery story
 * PUT /api/discovery-stories/:id
 */
export const updateDiscoveryStory = async (req, res) => {
  try {
    const body = { ...req.body };

    // Ensure optional fields are valid
    body.impact = Array.isArray(body.impact) ? body.impact : [];
    body.references = Array.isArray(body.references) ? body.references : [];
    body.timeline = Array.isArray(body.timeline) ? body.timeline : [];

    // Clean content array
    if (body.content) {
      body.content = body.content
        .map(c => ({ section: c.section?.trim(), text: c.text?.trim() }))
        .filter(c => c.section && c.text);
    }

    const updated = await DiscoveryStory.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    )
      .populate("discoveryId", "title field")
      .populate("scientistId", "name field");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
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
