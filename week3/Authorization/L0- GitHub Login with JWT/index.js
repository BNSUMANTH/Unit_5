require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const session = require("express-session");

const app = express();

// MongoDB User model
const UserSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: String,
  email: String,
});
const User = mongoose.model("User", UserSchema);

// Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            email: email,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send('<a href="/auth/github">Login with GitHub</a>');
});

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        githubId: req.user.githubId,
        username: req.user.username,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
