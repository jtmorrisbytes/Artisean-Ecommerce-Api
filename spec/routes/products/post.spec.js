const supertest = require("supertest");
const app = require("../../../index");

describe("Products Router POST api/product", () => {
  it("should have a controller implemented", done => {
    supertest(app)
      .put("/api/product")
      .type("json")
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).not.toBe(
          501,
          "did you make sure to implement the controller?"
        );
        expect(res.status).not.toBe(
          500,
          "did you make sure to define your controller in the router"
        );
        expect(res.status).not.toBe(404);
        done();
      });
  });
  it("should respond with bad request when required parameters are missing", done => {
    supertest(app)
      .post("/api/product")
      .accept("application/json")
      .type("json")
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(404);
        // expect(res.body.data).toEqual(newData);
        done();
      });
    // done();
  });
});
