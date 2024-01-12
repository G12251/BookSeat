const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register a new user

router.post("/register", async (req, res) => {
  try {
    // check if user already exists

    if (userExists) {
      return res.send({
        success: false,
        message: "You have an account",
      });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save a new user

    const newUser = new User(req.body);
    await newUser.save();

    // return a success message
    res.send({ success: true, message: "user created successfully" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//login a user
router.post("/login", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Password is incorrect",
      });
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "User logged successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;