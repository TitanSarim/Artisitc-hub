const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolio,
} = require("../controllers/portfolioController");
const { uploadPortfolio } = require("../middleware/savePortfolio");

const router = express.Router();

router
  .route("/create")
  .post(isAuthenticatedUser, uploadPortfolio.single("files"), createPortfolio);

router.route("/update/:id").patch(isAuthenticatedUser, updatePortfolio);

router.route("/delete/:id").delete(isAuthenticatedUser, deletePortfolio);

router.route("/portfolio").get(isAuthenticatedUser, getPortfolio);

module.exports = router;
