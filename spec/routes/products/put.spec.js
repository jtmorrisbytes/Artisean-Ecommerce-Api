const supertest = require("supertest");
const app = require("../../../index");

describe("Products Router PUT api/product/", () => {
  it("should have a controller implemented", done => {
    supertest(app)
      .put("/api/product/1")
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
        done();
      });
  });
  it("should respond with 404 not found when the request id does not exist", done => {
    supertest(app)
      .get("/api/products")
      .expect(200, (err, res) => {
        if (err) done(err);

        expect(res.body.data).toBeDefined(
          "res.body.data needs to exist for the test to work"
        );
        expect(res.body.data).not.toBeNull();
        let data = res.body.data;
        let testItemID = 0;
        let testData = {};
        for (let i = 0; i < data.length; i++) {
          if (data[i].id > testItemID) {
            testItemIndex = data[i].id;
            testData = data[i];
          }
        }
        supertest(app)
          .put("/api/products/" + (+testItemID + 1))
          .accept("application/json")
          .type("json")
          .send(testData)
          .expect(404, done);
        // done();
      });
  });
  it("should respond with 200 with the updated information included in the request", done => {
    supertest(app)
      .get("/api/products")
      .expect(200, (err, res) => {
        if (err) done(err);

        expect(res.body.data).toBeDefined(
          "res.body.data needs to exist for the test to work"
        );
        expect(res.body.data).not.toBeNull();
        let data = res.body.data;
        let testItemID = 0;
        let testData = {};
        for (let i = 0; i < data.length; i++) {
          if (data[i].id > testItemID) {
            testItemIndex = data[i].id;
            testData = data[i];
          }
        }

        let newData = {
          ...testData,
          name: "Thats What IT Means TO Me",
          description: "LO RE. mIpSUm",
          price: Math.random() * 50
        };
        supertest(app)
          .put("/api/product/" + testData.id)
          .accept("application/json")
          .type("json")
          .send(newData)
          .expect(200, (err, res) => {
            if (err) done(err);
            expect(res.body.data).toEqual(newData, res.body.data);
            done();
          });
        // done();
      });
  });
});
