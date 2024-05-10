const express = require("express");
const router = express.Router();
const {
  getBookByID,
  getBooks,
  postBook,
  patchBook,
  deleteBook,
} = require("./books.controller");

// Rutas para libros
router.get("/:id", getBookByID);
router.get("/", getBooks);
router.post("/", postBook);
router.patch("/:id", patchBook);
router.delete("/:id", deleteBook);

module.exports = router;
