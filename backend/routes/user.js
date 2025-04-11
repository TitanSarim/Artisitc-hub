const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getAllArtists,
  getUpdateStatus,
  getUserProfile,
  updateUserProfile,
  getAllPublicArtists,
} = require("../controllers/usersController");
const { uploadImage } = require("../middleware/saveImage");

const router = express.Router();

router.route("/getallArtists").get(isAuthenticatedUser, getAllArtists);
router.route("/update-artists").post(getUpdateStatus);
router.route("/user/getUserProfile").get(isAuthenticatedUser, getUserProfile);
router
  .route("/user/updateUserProfile")
  .put(isAuthenticatedUser, uploadImage.single("file"), updateUserProfile);
router.route("/user/getAllPublicArtists").get(getAllPublicArtists);

module.exports = router;
