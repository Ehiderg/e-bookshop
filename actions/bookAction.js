const Book = require("../models/Book");

async function readBookByID(bookID) {
  try {
    const book = await Book.findById(bookID);
    if (!book || !book.active) {
      throw new Error("No existe el libro");
    }
    return book;
  } catch (error) {
    throw new Error("Error al buscar el libro por ID");
  }
}

async function readBooks(queryParams) {
  try {
    const books = await Book.find(queryParams);
    if (!books) {
      throw new Error("No se encontraron libros");
    }
    return books;
  } catch (error) {
    throw new Error("Error al buscar libros");
  }
}

async function createBook(bookData, userID) {
  try {
    // Establecer el campo "seller" como el ID del usuario que está creando el libro
    bookData.seller = userID;
    
    const newBook = await Book.create(bookData);
    return newBook;
  } catch (error) {
    throw new Error("Error al crear el libro");
  }
}

async function updateBook(bookID, bookData, token) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookID, bookData, { new: true });
    if (!updatedBook || !updatedBook.active) {
      throw new Error("No se pudo actualizar el libro");
    }
    return updatedBook;
  } catch (error) {
    throw new Error("Error al actualizar el libro");
  }
}

async function removeBook(bookID, token) {
  try {
    const deletedBook = await Book.findByIdAndUpdate(bookID, { active: false }, { new: true });
    if (!deletedBook || !deletedBook.active) {
      throw new Error("No se pudo eliminar el libro");
    }
    return deletedBook;
  } catch (error) {
    throw new Error("Error al eliminar el libro");
  }
}

module.exports = {
  readBookByID,
  readBooks,
  createBook,
  updateBook,
  removeBook,
};
