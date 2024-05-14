const { get } = require("mongoose");
const {
  readBookByID,
  readBooks,
  createBook,
  updateBook,
  removeBook,
} = require("../actions/bookAction");


async function getBookByID(req, res) {
  try {
    const active = req.query.active;
    const book = await readBookByID(req.params.id, !active);

    return res.status(200).json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });
  }
}

async function getBooks(req, res) {
  try {
    const queryParams = req.query;
    const active = req.query.active;
    console.log(active);
    const books = await readBooks(queryParams, !active);
    res.status(200).json(books);
  } catch (error) {
;
    res.status(500).json({ message: error.message });
  }
}

async function postBook(req, res) {
  try {
    const ID  = req.headers.userId;
    const newBook = await createBook(req.body, ID); 
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function patchBook(req, res) {
  try {
    const book = await readBookByID(req.params.id);
    const sellerID = book.seller;
    if (sellerID !== req.headers.userId) {
      return res.status(403).json({ message: 'No tienes permiso para modificar este libro' });
    }
    const updatedBook = await updateBook(req.params.id, req.body);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteBook(req, res) {
  try {
    const book = await readBookByID(req.params.id);
    const sellerID = book.seller;

    if (sellerID !== req.headers.userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este libro' });
    }

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
