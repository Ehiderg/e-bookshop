const express = require("express");
const router = express.Router();
const {
  getBookByID,
  getBooks,
  postBook,
  patchBook,
  deleteBook,
} = require("../controllers/bookController");
const { verifyToken } = require("../controllers/authController");

// Rutas para libros
router.get("/:id", getBookByID);
router.get("/", getBooks);
router.post("/", verifyToken,postBook);
router.patch("/:id", verifyToken,patchBook);
router.delete("/:id", verifyToken,deleteBook);

module.exports = router;
