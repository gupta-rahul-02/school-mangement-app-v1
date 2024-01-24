const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  cookieToken(user, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send("All fields are mandatory");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return res.json({ 
        success:false,
        message: "Password does not match" });
  }

  cookieToken(user, res);
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

exports.updateRole = async (req, res, next) => {
  const { email, role } = req.body;
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer", "");
  if (!token) {
    res.send("Login first to access");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const loggeduser = await User.findById(decoded.id);

  try {
    if (loggeduser.email === email) {
      throw new Error("You can't update the role of yourself");
    }
    if (loggeduser.role === "teacher" && role === "admin") {
      throw new Error("You can't update the role of user");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User Not Found");
    }

    if (!["admin", "teacher", "student"].includes(role)) {
      throw new Error("Invalid User role");
    }

    user.role = role;
    const updatedUser = await user.save();
    
    res.json({
      message: "User Updated",
      user: updatedUser,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

exports.getUserOfSpecificRole = async (req, res, next) => {
  const role = req.params.role;
  const users = await User.find({ role: role });
  res.json({ users: users });
};

exports.getLoggedInUser = async (req, res, next) => {
  //const token = req.sessionStorage.getItem("token")

  const tokenRecevied = req.params.tokenRecevied;
  const decoded = jwt.verify(tokenRecevied, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  res.send(user);
};

exports.logout = async (req, res, next) => {
  res
    .cookie('token', null, {
      expires: new Date(0),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out",
    });
};

exports.deleteuser = async (req, res, next) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.send("user does not exists");
  } else {
    const name = user.firstName;
    await User.findOneAndDelete({ email: email });

    res.json({
      message: `${name} user is deleted`,
    });
  }
};
