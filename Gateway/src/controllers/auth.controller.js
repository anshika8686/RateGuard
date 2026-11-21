const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  console.log("Login controller reached");

  try {
    const {email,password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const isUserexist = await userModel
      .findOne({email: email.trim().toLowerCase() })
      .select("+password");
    //ONLY RETURNING USERNAME AND EMAIL
    //TO COMPARE PASSWORD WE WRITE SELECT ("+PASSWORD")
    //RETURN PASSWORD ALSO IN USER

    if (!isUserexist) {
      return res.status(401).json({
        message: "No such user exist",
      });
    }

    const passwordmatched = await bcrypt.compare(
      password,
      isUserexist.password,
    );

    if (!passwordmatched) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    //STORED INFO OF USER WHICH WILL BE STORED IN TOKEN
    const payload = {
      id: isUserexist._id,
      username: isUserexist.username,
      email: isUserexist.email
    };

    //USER LOGIN=>NEW TOKEN IS CREATED=>SIGNED BY JWT_SECRET
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn:"1d"
    });

    //STORE IN COOKIE
    res.cookie("token", token,{
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
});

    return res.status(200).json({
      message: "User login successfull",
      user: {
        email: isUserexist.email,
        username: isUserexist.username,
      },
    });
  } 
    catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function signupController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    //FIND THE USER
    const isUserExist = await userModel.findOne({
      $or: [
        { username: username.trim() },
        { email: email.trim().toLowerCase() }
      ]
    });

    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists"
      });
    }


    // NEW USER
    const hash = await bcrypt.hash(password, 10); // 10=>salt rounds
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //GET THE TOKEN
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token,{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
});

    return res.status(201).json({
      message: "Sign Up Successfull",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
}

function logoutController(req, res) {
  res.clearCookie("token",{httpOnly: true,
  secure: true,
  sameSite: "none",}
);
  return res.status(200).json({
    message: "Log-Out successfully",
  });
}

async function getmeController(req, res) {
  res.set("Cache-Control", "no-store");
  console.log("Inside getmeController");
  console.log(req.user);
  try {
    const usermail = req.user.email;

    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //DATA WHICH IS GETTING RETURNED
    return res.status(200).json({
      message: "User details fetched successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
   } 
    catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  loginController,
  signupController,
  logoutController,
  getmeController,
};
