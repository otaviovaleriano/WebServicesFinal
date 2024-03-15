const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const apiKey =
  "Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N";

// GET
const getAllBooks = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("books").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// GET Specific Book
const getSingleBook = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid bookId to find a book.");
  }
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("books")
    .find({ _id: bookId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// POST new Book
const createNewBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author_id: req.body.author_id,
      genre: req.body.genre,
      published_year: req.body.published_year,
      publisher: req.body.publisher,
      pages: req.body.pages,
      isbn: req.body.isbn,
    };

    console.log("Received book data:", book);

    // Assuming you have a MongoDB connection named 'mongodb'
    const response = await mongodb
      .getDb()
      .db()
      .collection("books")
      .insertOne(book);

    console.log("MongoDB insertion response:", response);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Create failed. Something went wrong...");
    }
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json("Internal server error");
  }
};

// PUT new info on a specific book
const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid bookId to update a book.");
  }
  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author_id: req.body.author_id,
    genre: req.body.genre,
    published_year: req.body.published_year,
    publisher: req.body.publisher,
    pages: req.body.pages,
    isbn: req.body.isbn,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("books")
    .replaceOne({ _id: bookId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Update failed. Book not found or something went wrong..."
      );
  }
};

// DELETE a specific book
const deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid bookId to delete a book.");
  }
  const bookId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("books")
    .deleteOne({ _id: bookId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Delete failed. Book not found or something went wrong..."
      );
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createNewBook,
  updateBook,
  deleteBook,
};
