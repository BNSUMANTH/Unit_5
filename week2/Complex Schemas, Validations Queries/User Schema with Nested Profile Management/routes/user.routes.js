const express = require("express");
const userModel = require("../models/userSchema.models");

const userRouter = express.Router();

userRouter.post("/add-user", async (req, res) => {
    try {
        let user = await userModel.create(req.body);
        res.status(201).json({ msg: "User added", user });
    } catch (error) {
        res.status(500).json({ msg: "User failed to create", error: error.message });
    }
});

userRouter.post("/add-profile/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        user.profiles.push(req.body);
        await user.save();
        res.status(201).json({ msg: "User profile updated", user });
    } catch (error) {
        res.status(500).json({ msg: "Failed to add profile", error: error.message });
    }
});

userRouter.get("/get-users", async (req, res) => {
    const { profile } = req.query;
    try {
        let users = await userModel.find();

        if (profile) {
            users = users.filter(user =>
                user.profiles.some(p => p.profileName === profile)
            );
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Failed to get users", error: error.message });
    }
});


userRouter.get("/search", async (req, res) => {
    const { name, profile } = req.query;
    try {
        const user = await userModel.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchedProfile = user.profiles.find(p => p.profileName === profile);

        if (matchedProfile) {
            return res.status(200).json({ profile: matchedProfile });
        } else {
            return res.status(404).json({
                message: "User found, but profile not found",
                user
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "Search failed", error: error.message });
    }
});

userRouter.put("/update-profile/:userId/:profileName", async (req, res) => {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const profile = user.profiles.find(p => p.profileName === profileName);
        if (!profile) return res.status(404).json({ msg: "Profile not found" });

        profile.url = url;
        await user.save();

        res.status(200).json({ msg: "Profile updated", profile });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update profile", error: error.message });
    }
});


userRouter.delete("/delete-profile/:userId/:profileName", async (req, res) => {
    const { userId, profileName } = req.params;

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const originalLength = user.profiles.length;
        user.profiles = user.profiles.filter(p => p.profileName !== profileName);

        if (user.profiles.length === originalLength) {
            return res.status(404).json({ msg: "Profile not found" });
        }

        await user.save();
        res.status(200).json({ msg: "Profile deleted", user });
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete profile", error: error.message });
    }
});

module.exports = userRouter;
