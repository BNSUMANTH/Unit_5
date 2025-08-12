const Content = require("../models/Content");
const User = require("../models/User");

exports.getFreeContent = async (req, res) => {
  try {
    const content = await Content.find({ type: "free" });
    res.json(content);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching free content", error: err.message });
  }
};

exports.getPremiumContent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!["premium", "pro"].includes(user.subscription.plan)) {
      return res
        .status(403)
        .json({ message: "Upgrade to premium or pro to access this content" });
    }
    const content = await Content.find({ type: "premium" });
    res.json(content);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching premium content", error: err.message });
  }
};

exports.createContent = async (req, res) => {
  try {
    const { title, type, description } = req.body;
    if (!["free", "premium"].includes(type))
      return res.status(400).json({ message: "Invalid content type" });
    const content = await Content.create({
      title,
      type,
      description,
      createdBy: req.user.id,
    });
    res.status(201).json(content);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating content", error: err.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    await Content.findByIdAndDelete(id);
    res.json({ message: "Content deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting content", error: err.message });
  }
};

exports.getProDiscount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.subscription.plan !== "pro") {
      return res.status(403).json({ message: "Only pro users get discounts" });
    }
    // Example: 20% discount for pro users
    res.json({ discount: "20%" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching discount info", error: err.message });
  }
};
