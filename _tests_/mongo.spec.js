const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("books");
  });
  afterAll(async () => {
    await connection.close();
  });

  it("should insert a new book into the book collection", async () => {
    const book = db.collection("books");

    const mockBook = {
      title: "Book Test",
      author_id: "65f3a916dde35f7c857e7ba3",
      genre: "Fiction",
      published_year: 1960,
      publisher: "J. B. Lippincott & Co.",
      pages: 340,
      isbn: "9780061120082",
    };

    await book.insertOne(mockBook);

    const insertedBook = await book.findOne({
      author_id: "65f3a916dde35f7c857e7ba3",
    });

    console.log("Inserted Book:", insertedBook);
    console.log("Mock Book:", mockBook);
    delete insertedBook._id;
    delete mockBook._id;
    expect(insertedBook).toEqual(mockBook);
  });

});
