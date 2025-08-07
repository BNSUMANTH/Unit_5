const express = require("express");
const User = require("../model/user.model");
const Profile = require("../model/profile.model");

const userRouter = express.Router();

userRouter.post("/create-user", async (req,res)=>{
    const {name,email} = req.body;  
    const user = new User({name,email});
    await user.save();
    res.status(201).json({message:"User created successfully",user});
});

userRouter.post("/create-profile", async (req,res)=>{
    const {bio,socialMediaLinks,user} = req.body;
    const profile = new Profile({bio,socialMediaLinks,user});
    await profile.save();
    res.status(201).json({message:"Profile created successfully",profile});
});

userRouter.get("/profiles", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", { name: 1, email: 1 });
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error });
    }
});
module.exports = userRouter;

