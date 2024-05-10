const express = require("express");
const router = express.Router();
const {
  getUserByID,
  createUserHandler,
  updateUserHandler,
  softDeleteUserHandler,
} = require("../controllers/userController");




// Obtener un usuario por ID
router.get("/:id", getUserByID);

// Crear un nuevo usuario
router.post("/", createUserHandler);

// Actualizar un usuario existente
router.patch("/:id", updateUserHandler);

// Eliminar un usuario (soft delete)
router.delete("/:id", softDeleteUserHandler);

module.exports = router;
