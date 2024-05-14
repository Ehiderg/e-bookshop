const express = require("express");
const router = express.Router();
const {
  getOrderById,
  getOrders,
  postOrder,
  patchOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { verifyToken } = require("../controllers/authController");

// Rutas para ordenes
router.get("/:id", verifyToken,getOrderById);
router.get("/", verifyToken, getOrders);
router.post("/", verifyToken, postOrder);
router.patch("/:id", verifyToken,patchOrder);
router.delete("/:id", verifyToken,deleteOrder);

module.exports = router;
