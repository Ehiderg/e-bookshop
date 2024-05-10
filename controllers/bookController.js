const {
    readBookByID,
    readBooks,
    createBook,
    updateBook,
    removeBook,
  } = require("../actions/bookAction");
  
  async function getBookByID(req, res) {
    try {
      const book = await readBookByID(req.params.id);
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async function getBooks(req, res) {
    try {
      const queryParams = req.query;
      const books = await readBooks(queryParams);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async function postBook(req, res) {
    try {
      const newBook = await createBook(req.body, req.user.id); // req.user.id contiene el ID del usuario que está creando el libro
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  async function patchBook(req, res) {
    try {
      const updatedBook = await updateBook(req.params.id, req.body);
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  async function deleteBook(req, res) {
    try {
      const deletedBook = await removeBook(req.params.id);
      res.status(200).json({ message: "Libro eliminado exitosamente", book: deletedBook });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  module.exports = {
    getBookByID,
    getBooks,
    postBook,
    patchBook,
    deleteBook,
  };
  