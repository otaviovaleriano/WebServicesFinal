const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// GET
const getAllCategories = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("categories").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// GET Specific Categorie
const getSingleCategorie = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid categoriesId to find a categories.');
  }
  const categoriesId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("categories")
    .find({ _id: categoriesId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// POST new Categorie
const createNewCategorie = async (req, res) => {
  try {
    const categories = {
        name: req.body.name,
        description: req.body.description,
      };

    console.log("Received categories data:", categories);

    // Assuming you have a MongoDB connection named 'mongodb'
    const response = await mongodb
      .getDb()
      .db()
      .collection("categories")
      .insertOne(categories);

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
    console.error("Error creating categories:", error);
    res.status(500).json("Internal server error");
  }
};

// PUT new info on a specific categories
const updateCategorie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid categoriesId to update a categories.');
  }
  const categoriesId = new ObjectId(req.params.id);
  const categories = {
        name: req.body.name,
        description: req.body.description,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("categories")
    .replaceOne({ _id: categoriesId }, categories);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Update failed. Categorie not found or something went wrong..."
      );
  }
};


// DELETE a specific categories
const deleteCategorie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid categoriesId to delete a categories.');
  }
  const categoriesId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("categories")
    .deleteOne({ _id: categoriesId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Delete failed. Categorie not found or something went wrong..."
      );
  }
};

module.exports = {
  getAllCategories,
  getSingleCategorie,
  createNewCategorie,
  updateCategorie,
  deleteCategorie,
};
