const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  verifyUserAccountCtrl,
} = require("../controllers/authController");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/register", registerUserCtrl);
router.post("/login", loginUserCtrl);

router.get("/:userId/verify/:token", validateObjectId, verifyUserAccountCtrl);

module.exports = router;
