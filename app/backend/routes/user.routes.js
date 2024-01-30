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
  imageUpload,
  uploader,
} = require("../controllers/user.controller");
const { customRoles, isLoggedIn } = require("../middlewares/users.middleware");
const multer = require('multer')
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//post routes
router.post("/signup",signUp);
router.post("/login",login);
router.post("/upload",upload.single('image'),uploader)

router.post("/upload",upload.single('image'),uploader)
//get routes
router.get("/users",isLoggedIn,customRoles("admin","teacher"),getUsers);
router.get("/logout",logout);
router.get("/roles/:role",getUserOfSpecificRole);
router.get("/token/:tokenRecevied",getLoggedInUser);

//put routes
router.put("/update",isLoggedIn, customRoles("admin", "teacher"), updateRole);

//delete routes
router.delete("/delete/:email",deleteuser);

module.exports = router;
