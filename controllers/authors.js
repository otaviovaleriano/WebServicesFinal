const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// GET
const getAllAuthors = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("authors").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// GET Specific Author
const getSingleAuthor = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid authorId to find a author.');
  }
  const authorId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("authors")
    .find({ _id: authorId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// POST new Author
const createNewAuthor = async (req, res) => {
  try {
    const author = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        nationality: req.body.nationality,
      };

    console.log("Received author data:", author);

    // Assuming you have a MongoDB connection named 'mongodb'
    const response = await mongodb
      .getDb()
      .db()
      .collection("authors")
      .insertOne(author);

    console.log("MongoDB insertion response:", response);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Create failed. Something went wrong..."
        );
    }
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json("Internal server error");
  }
};

// PUT new info on a specific author
const updateAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid authorId to update a author.');
  }
  const authorId = new ObjectId(req.params.id);
  const author = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        nationality: req.body.nationality,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("authors")
    .replaceOne({ _id: authorId }, author);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Update failed. Author not found or something went wrong..."
      );
  }
};


// DELETE a specific author
const deleteAuthor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid authorId to delete a author.');
  }
  const authorId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("authors")
    .deleteOne({ _id: authorId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Delete failed. Author not found or something went wrong..."
      );
  }
};

module.exports = {
  getAllAuthors,
  getSingleAuthor,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
};
