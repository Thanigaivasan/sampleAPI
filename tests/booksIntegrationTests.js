require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "Test";

const app = require("../app.js");
const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book Crud Test", () => {
  it("should allow a book to be posted and return read from _it", done => {
    const bookpost = {
      title: "my Book",
      author: "My author",
      genre: "fantasy"
    };
    agent
      .post("/api/books")
      .send(bookpost)
      .expect(200)
      .end((err, results) => {
        //  console.log(results);
        //results.body.read.should.not.equal(false);
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach(done => {
    Book.deleteMany({}).exec();
    done();
  });

  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
