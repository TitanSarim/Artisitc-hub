const prisma = require("../prisma/prisma");

// Create new order
const createOrder = async (req, res) => {
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

    // Check if art is already ordered
    const existingOrder = await prisma.order.findFirst({
      where: {
        artId: parseInt(artId),
      },
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Art is already ordered" });
    }

    // Check if user has enough balance in wallet
    const userWallet = await prisma.wallet.findUnique({
      where: { userId: userId },
    });

    if (!userWallet || userWallet.amount < art.price) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: userId,
        artId: parseInt(artId),
        quantity: 1,
        totalPrice: art.price,
        status: "pending",
      },
      include: {
        art: true,
      },
    });

    // Update art status to sold
    await prisma.arts.update({
      where: { id: parseInt(artId) },
      data: { status: "SOLD" },
    });

    // Remove from cart if exists
    await prisma.cart.deleteMany({
      where: {
        artId: parseInt(artId),
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// Get user's orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user.userid;

    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        art: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Error getting orders" });
  }
};

// Get single order
const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userid;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        art: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ message: "Error getting order" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const userId = req.user.userid;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status },
      include: {
        art: true,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order" });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userid;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }

    // Update order status to cancelled
    await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: "cancelled" },
    });

    // Update art status back to available
    await prisma.arts.update({
      where: { id: order.artId },
      data: { status: "LIVE" },
    });

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Error cancelling order" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
};
