const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

// GET
const getAllMovies = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("movies").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// GET Specific Movie
const getSingleMovie = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movieId to find a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("movies")
    .find({ _id: movieId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// POST new Movie
const createNewMovie = async (req, res) => {
  try {
    const movie = {
        name: req.body.name,
        genre: req.body.genre,
        director: req.body.director,
        release_date: req.body.release_date,
        duration_minutes: req.body.duration_minutes,
        studio: req.body.studio,
        description: req.body.description,
        film_rating: req.body.film_rating
      };

    console.log("Received movie data:", movie);

    // Assuming you have a MongoDB connection named 'mongodb'
    const response = await mongodb
      .getDb()
      .db()
      .collection("movies")
      .insertOne(movie);

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
    console.error("Error creating movie:", error);
    res.status(500).json("Internal server error");
  }
};

// PUT new info on a specific movie
const updateMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movieId to update a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  const movie = {
        name: req.body.name,
        genre: req.body.genre,
        director: req.body.director,
        release_date: req.body.release_date,
        duration_minutes: req.body.duration_minutes,
        studio: req.body.studio,
        description: req.body.description,
        film_rating: req.body.film_rating
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("movies")
    .replaceOne({ _id: movieId }, movie);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Update failed. Movie not found or something went wrong..."
      );
  }
};


// DELETE a specific movie
const deleteMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movieId to delete a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("movies")
    .deleteOne({ _id: movieId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Delete failed. Movie not found or something went wrong..."
      );
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  createNewMovie,
  updateMovie,
  deleteMovie,
};
