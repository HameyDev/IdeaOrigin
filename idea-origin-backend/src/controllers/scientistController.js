import Scientist from "../models/Scientist.js";

export const getAllScientists = async (req, res) => {
  try {
    const scientists = await Scientist.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: scientists.length,
      data: scientists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch scientists",
      error: error.message,
    });
  }
};


export const getScientistById = async (req, res) => {
  try {
    const { id } = req.params;

    const scientist = await Scientist.findOne({ id });

    if (!scientist) {
      return res.status(404).json({
        success: false,
        message: "Scientist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: scientist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch scientist",
      error: error.message,
    });
  }
};
