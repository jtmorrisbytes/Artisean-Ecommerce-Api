const supertest = require("supertest");
const app = require("../../../index");

describe("Products Router POST api/product", () => {
  const testData = {
    name: "Jordan Morris",
    description:
      "A well tested piece of code! allows commas, exclamations, ? question marks, colon :, semi-colon ;," +
      " quotation marks \"\", apostrophes, '' and periods.",
    tags: "a,short short,list,of,words,seperated,by,commas",
    price: 999.99
  };
  const missingData = {};
  const badData = {
    name: "~`!@#$%^&*()_-+=}]{[\"':;?/>.<,",
    tags: "~`1!2@3#4$5%6^7&8*9(0)-_=+\\|'\"<>./?",
    description: "",
    price: "this is definately not a number"
  };
  it("should have a controller implemented", done => {
    supertest(app)
      .post("/api/product")
      .type("json")
      .send(testData)
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
      .send(missingData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).toEqual(400);
        // expect(res.body.data).toEqual(newData);
        done();
      });
    // done();
  });
  it("should respond with bad request when the request is badly formatted", done => {
    supertest(app)
      .post("/api/product")
      .accept("application/json")
      .type("json")
      .send(badData)
      .expect(400, done);
  });
  it("should respond with OK along with the updated data", done => {
    supertest(app)
      .post("/api/product")
      .accept("application/json")
      .type("json")
      .send(testData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.get("Content-Type")).toContain(
          "application/json",
          "The response type should be json"
        );
        expect(res.get("ContentType")).not.toContain(
          "text/html",
          "The response type should not be html"
        );
        expect(res.status).toEqual(200);
        expect(res.body).toBeDefined("The response body was empty");
        expect(res.body).toEqual(jasmine.any(Object));
        expect(res.body.data).toBeDefined(
          "The response object should be on res.body.data"
        );
        for (key in testData) {
          expect(res.body.data[key]).toBeDefined(
            `the response object data should contain '${key}'`
          );
        }
        expect(res.body.data).toEqual(jasmine.any(Object));
        expect(String(+res.body.data.id)).not.toEqual("NaN");
        expect(String(+res.body.data.price)).not.toEqual("NaN");
        done();
        // expect(res.body.data.description);
      });
  });
});
