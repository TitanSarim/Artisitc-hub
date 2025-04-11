const prisma = require("../prisma/prisma");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { artId } = req.body;
    const userId = req.user.userid;

    // Check if art exists and is available
    const art = await prisma.arts.findUnique({
      where: { id: parseInt(artId) },
    });

    if (!art) {
      return res.status(404).json({ message: "Art not found" });
    }

    if (art.status === "SOLD") {
      return res.status(400).json({ message: "Art is already sold" });
    }

    // Check if item already in cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: userId,
        artId: parseInt(artId),
      },
    });

    if (existingCartItem) {
      return res.status(400).json({ message: "Art already in cart" });
    }

    // Check if art is already ordered
    const existingOrder = await prisma.order.findFirst({
      where: {
        artId: parseInt(artId),
      },
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Art is already ordered" });
    }

    // Create new cart item
    const cart = await prisma.cart.create({
      data: {
        userId: userId,
        artId: parseInt(artId),
        quantity: 1, // Always set quantity to 1
      },
      include: {
        art: true,
      },
    });

    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.userid;

    const cart = await prisma.cart.findMany({
      where: { userId: userId },
      include: {
        art: true,
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Error getting cart" });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userid;

    const cart = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (cart.userId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedCart = await prisma.cart.update({
      where: { id: parseInt(cartId) },
      data: { quantity: parseInt(quantity) },
      include: {
        art: true,
      },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Error updating cart" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userId = req.user.userid;

    const cart = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (cart.userId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prisma.cart.delete({
      where: { id: parseInt(cartId) },
    });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Error removing from cart" });
  }
};

// Clear user's cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userid;

    await prisma.cart.deleteMany({
      where: { userId: userId },
    });

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
