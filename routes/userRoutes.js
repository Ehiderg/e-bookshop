const express = require("express");
const router = express.Router();
const {
  getUserByID,
  getAllUsers,
  createUserHandler,
  updateUserHandler,
  softDeleteUserHandler,
} = require("../controllers/userController");

// Obtener todos los usuarios
router.get("/", getAllUsers);

// Obtener un usuario por ID
router.get("/:id", getUserByID);

// Crear un nuevo usuario
router.post("/", createUserHandler);

// Actualizar un usuario existente
router.put("/:id", updateUserHandler);

// Eliminar un usuario (soft delete)
router.delete("/:id", softDeleteUserHandler);

module.exports = router;
