const supertest = require("supertest");
const app = require("../../../index");
const model = require;
const testProductResponseModel = require("./testResponseModel").bind({ app });

describe("Product Router", () => {
  // const testU;
  let data;
  let testItemIndex;
  let testItem;

  it("should have a route handler implemented at /api/product/:id ", done => {
    supertest(app)
      .delete("/api/product/" + 0)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        // expect(res.status).toBe(200);
        expect(res.status).not.toBe(
          501,
          "did you make sure to implement the delete controller for '/api/product:id' ? "
        );
        expect(res.status).not.toBe(
          404,
          "did you make sure to define delete handler route /api/product/:id ?"
        );
        done();
      });
  });
  it("should respond with status 400 Bad Request when a string is given as an argument", done => {
    supertest(app)
      .delete("/api/product/abcd")
      .expect(400, (err, res) => {
        if (err) {
          done(err);
        }

        expect(res.get("Content-Type")).toContain(
          "application/json",
          "the response type should be JSON"
        );
        expect(res.get("Content-Type")).not.toContain(
          "text/html",
          "the response type should not be text/html"
        );
        expect(res.body).toBeDefined("Error response was empty");
        expect(res.body.data).toEqual(
          {},
          "Data should be an empty object during a bad request response"
        );
        // expect(res.body.error).toBeDefined();
        expect(res.body.error).toEqual(jasmine.any(Object));
        // expect(res.body.error.type).toBeDefined()
        expect(res.body.error.type).toEqual("TypeError", "res.body.error:");
        expect(res.body.error.description).toEqual(jasmine.any(String));
        done();
      });
  });
  it("should not return a deleted product", done => {
    supertest(app)
      .get("/api/products")
      .expect(200, (err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body.data).toBeDefined();
        expect(res.body.data).toEqual(jasmine.any(Array));
        let data = res.body.data;
        let testItemIndex = Math.floor(Math.random() * data.length);
        let testItem = data[testItemIndex];
        supertest(app)
          .delete("/api/product/" + testItem.id)
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).not.toEqual(
              404,
              "the test id '" +
                testItemIndex +
                "'should exist when calling delete"
            );
            expect(res.status).toEqual(
              200,
              "the operation should be successful"
            );
            supertest(app)
              .get("/api/products/" + testItem.id)
              .expect(404, done);
            // done();
          });
      });
  });
});
