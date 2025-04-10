const errorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const { PrismaClient, artStatus } = require("@prisma/client");

const prisma = new PrismaClient();

// Create new art
const createArt = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.userid;
    const { title, description, price } = req.body;
    const file = req.file?.filename;

    const newArt = await prisma.arts.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        status: artStatus.DRAFT,
        image: JSON.stringify(file),
        userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Art created successfully",
      art: newArt,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Update art
const updateArt = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.userid;
    const id = parseInt(req.params.id);
    const { title, description, price, status } = req.body;
    const file = req.file?.filename;

    const existingArt = await prisma.arts.findFirst({
      where: { id, userId },
    });

    if (!existingArt) {
      return next(new errorHandler("Art not found or unauthorized", 404));
    }
    if (existingArt.status === artStatus.SOLD) {
      return next(new errorHandler("Art soled you cannot updateit", 406));
    }

    const updatedArt = await prisma.arts.update({
      where: { id },
      data: {
        title,
        description,
        price: price ? parseFloat(price) : existingArt.price,
        status: artStatus.DRAFT,
        image: JSON.stringify(file) || existingArt.image,
      },
    });

    res.status(200).json({
      success: true,
      message: "Art updated successfully",
      art: updatedArt,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Delete art
const deleteArt = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.userid;
    const id = parseInt(req.params.id);

    const existingArt = await prisma.arts.findFirst({
      where: { id, userId },
    });

    if (!existingArt) {
      return next(new errorHandler("Art not found or unauthorized", 404));
    }

    if (existingArt.status === artStatus.SOLD) {
      return next(new errorHandler("Art soled you cannot updateit", 406));
    }

    await prisma.arts.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Art deleted successfully",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Get all arts for a user
const getAllArts = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.userid;

    const arts = await prisma.arts.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const formatted = arts.map((art) => ({
      ...art,
      imageUrl: art.image ? `${process.env.API_URL}/Arts/${art.image}` : null,
    }));

    res.status(200).json({
      success: true,
      arts: formatted,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Get all arts for a public
const getAllPublicArts = catchAsyncError(async (req, res, next) => {
  try {
    const arts = await prisma.arts.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = arts.map((art) => ({
      ...art,
      imageUrl: art.image ? `${process.env.API_URL}/Arts/${art.image}` : null,
    }));

    res.status(200).json({
      success: true,
      arts: formatted,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Get a single art
const getSinglelArt = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.userid;
    const id = parseInt(req.params.id);

    const art = await prisma.arts.findFirst({
      where: { id, userId },
    });

    if (!art) {
      return next(new errorHandler("Art not found", 404));
    }

    const artWithUrl = {
      ...art,
      imageUrl: art.image ? `${process.env.API_URL}/Arts/${art.image}` : null,
    };

    res.status(200).json({
      success: true,
      art: artWithUrl,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

// Get a single public art
const getSinglelPublicArt = catchAsyncError(async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const art = await prisma.arts.findFirst({
      where: { id },
    });

    if (!art) {
      return next(new errorHandler("Art not found", 404));
    }

    const artWithUrl = {
      ...art,
      imageUrl: art.image ? `${process.env.API_URL}/Arts/${art.image}` : null,
    };

    res.status(200).json({
      success: true,
      art: artWithUrl,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

module.exports = {
  createArt,
  updateArt,
  deleteArt,
  getAllArts,
  getSinglelArt,
  getAllPublicArts,
  getSinglelPublicArt,
};
