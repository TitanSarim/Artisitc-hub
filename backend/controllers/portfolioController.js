const errorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create Portfolio
const createPortfolio = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.userid;
    const { title, description } = req.body;

    const file = req.file.filename;

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        file: JSON.stringify(file),
        userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully.",
      portfolio,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Update Portfolio
const updatePortfolio = catchAsyncError(async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, image } = req.body;

    const existing = await prisma.portfolio.findUnique({ where: { id } });
    if (!existing) return next(new errorHandler("Portfolio not found", 404));

    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        image,
      },
    });

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully.",
      portfolio: updated,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Delete Portfolio
const deletePortfolio = catchAsyncError(async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.portfolio.findUnique({ where: { id } });
    if (!existing) return next(new errorHandler("Portfolio not found", 404));

    await prisma.portfolio.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Get Portfolios of logged-in user
const getPortfolio = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.userid;

    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const formattedPortfolios = portfolios.map((portfolio) => {
      let fileUrl = null;

      if (portfolio.image) {
        // If image is a string (single filename)
        if (typeof portfolio.image === "string") {
          fileUrl = `${process.env.API_URL}/portfolio/${portfolio.image}`;
        }
      }

      return {
        ...portfolio,
        fileUrl,
      };
    });

    res.status(200).json({
      success: true,
      portfolios: formattedPortfolios,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

module.exports = {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolio,
};
