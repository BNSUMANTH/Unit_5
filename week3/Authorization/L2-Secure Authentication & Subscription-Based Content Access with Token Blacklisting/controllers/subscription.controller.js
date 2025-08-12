const Subscription = require("../models/Subscription");
const User = require("../models/User");

const PLANS = ["free", "premium", "pro"];
const PLAN_DAYS = 30;

function getExpiryDate() {
  const now = new Date();
  now.setDate(now.getDate() + PLAN_DAYS);
  return now;
}

exports.subscribe = async (req, res) => {
  try {
    const { plan } = req.body;
    if (!PLANS.includes(plan) || plan === "free")
      return res.status(400).json({ message: "Invalid plan" });
    const user = await User.findById(req.user.id);
    const start = new Date();
    const expiry = getExpiryDate();
    await Subscription.create({ user: user._id, plan, start, expiry });
    user.subscription = { plan, start, expiry };
    await user.save();
    res.json({ message: `Subscribed to ${plan}` });
  } catch (err) {
    res.status(500).json({ message: "Subscription error", error: err.message });
  }
};

exports.status = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const now = new Date();
    if (user.subscription.expiry && user.subscription.expiry < now) {
      user.subscription = { plan: "free" };
      await user.save();
      return res.json({ plan: "free", expired: true });
    }
    res.json({
      plan: user.subscription.plan,
      expiry: user.subscription.expiry,
    });
  } catch (err) {
    res.status(500).json({ message: "Status error", error: err.message });
  }
};

exports.renew = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const now = new Date();
    if (!user.subscription.plan || user.subscription.plan === "free") {
      return res
        .status(400)
        .json({ message: "No active paid subscription to renew" });
    }
    if (user.subscription.expiry && user.subscription.expiry < now) {
      return res
        .status(400)
        .json({ message: "Subscription expired, buy a new one" });
    }
    user.subscription.expiry = getExpiryDate();
    await user.save();
    res.json({
      message: "Subscription renewed",
      expiry: user.subscription.expiry,
    });
  } catch (err) {
    res.status(500).json({ message: "Renewal error", error: err.message });
  }
};

exports.cancel = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.subscription = { plan: "free" };
    await user.save();
    res.json({ message: "Subscription cancelled, downgraded to free" });
  } catch (err) {
    res.status(500).json({ message: "Cancel error", error: err.message });
  }
};
