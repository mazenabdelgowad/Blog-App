const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

/** ----------------------------------------------
 * @desc Register new user
 * @route /api/auth/register
 * @method POST
 * @access public
	----------------------------------------------*/

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: "Error", message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });

  if (user)
    return res
      .status(400)
      .json({ status: "Fail", message: "user already exists" });

  const hasedPassword = await bcrypt.hash(req.body.password, 10);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hasedPassword,
  });

  await user.save();

  // @TODO - sending email (verifiy account if not verified)

  return res.status(201).json({
    status: "Success",
    data: { user },
    message: "you have registerd successfully, please login",
  });
});

/** ----------------------------------------------
 * @desc login  user
 * @route /api/auth/login
 * @method POST
 * @access public
	----------------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: "Error", message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ status: "Fail", message: "Invalid email or password" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(401).json({ status: "Fail", message: "wrong Password" });

  const token = user.generateAuthToken();

  // @TODO - sending email (verifiy account if not verified)

  return res.status(200).json({
    status: "Success",
    data: {
      token,
      id: user._id,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      username: user.username,
    },
  });
});
