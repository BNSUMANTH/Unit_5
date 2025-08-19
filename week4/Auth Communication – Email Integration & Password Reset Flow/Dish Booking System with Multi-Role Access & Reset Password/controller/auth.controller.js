const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const USER = require('../model/user.model');
const saltRounds = 10;


const register=async (req, res) => {
    try {
        let d=req.body
        bcrypt.hash(d.password, saltRounds, async function(err, hash) {
            if (err){
                return res.status(500).json({ message: "Error hashing password" });
            }
            await USER.create({ ...d, password: hash });
            return res.status(201).json({ message: "User registered successfully" });
        })
    }
    catch(err){
        return res.status(500).json({ message: "Error registering user" })
    }
}

const login = async (req, res) => {
    try{
        let { email, password } = req.body;
        let user = await USER.findOne({ email })
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if (err) {
                return res.status(500).json({ message: "Error comparing passwords" })
            }
            if(result){
                var token = jwt.sign({ userId: user._id, role: user.role }, 'shhhhh');
                return res.status(200).json({ message: "Login successful", user, token })

            } else {
                return res.status(401).json({ message: "Invalid credentials" })
            }
        })
    }
    catch(err){
        return res.status(500).json({ message: "Error logging in" })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = jwt.sign({ userId: user._id }, 'shhhhh', { expiresIn: '1h' });
        
        return res.status(200).json({ message: "Password reset link sent", token });
    } catch (err) {
        return res.status(500).json({ message: "Error sending password reset email" });
    }
};

module.exports = { register, login, forgotPassword };