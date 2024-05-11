const express = require("express");
const router = express.Router();
const {
  getUserByID,
  createUserHandler,
  updateUserHandler,
  softDeleteUserHandler,
} = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");




// Obtener un usuario por ID
router.get("/:id",verifyToken, getUserByID);

// Crear un nuevo usuario
router.post("/", createUserHandler);

// Actualizar un usuario existente
router.patch("/:id", verifyToken,updateUserHandler);

// Eliminar un usuario (soft delete)
router.delete("/:id", verifyToken,softDeleteUserHandler);

module.exports = router;
