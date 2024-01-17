const express = require("express");
const {
  signUp,
  login,
  getUsers,
  updateRole,
  getUserOfSpecificRole,
  getLoggedInUser,
  logout,
  deleteuser,
} = require("../controllers/user.controller");
const { customRoles, isLoggedIn } = require("../middlewares/users.middleware");
const router = express.Router();



// get req


//post req

router.route("/signup").post(signUp);
router.post("/signup",signUp);
router.route("/login").post(login);
// router.route('/users').get(customRoles('admin'), getUsers)
router
  .route("/users")
  .get(isLoggedIn, customRoles("admin", "teacher"), getUsers);
router
  .route("/update")
  .put(isLoggedIn, customRoles("admin", "teacher"), updateRole);
router.route("/roles/:role").get(getUserOfSpecificRole);
router.route("/token/:tokenRecevied").get(getLoggedInUser);
router.route("/logout").get(logout);
router.route("/delete/:email").delete(deleteuser);
module.exports = router;
