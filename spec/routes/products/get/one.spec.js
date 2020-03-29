const model = require("../../../../lib/src/models/product");
const data = require("../../../../src/routes/products/data.json");
const request = require("supertest");
describe("GET /product/:id", () => {
  let app;
  let productID = 1;
  let product;
  beforeEach(() => {
    app = require("../../../../index");
    productID = 1;
    product = data.find(product => {
      return product.id == productID;
    });
  });

  let testUrl = "/api/product/";
  it("should determine its exisance by responding with status 200", done => {
    request(app)
      .get(testUrl + productID)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        if (product) {
          expect(res.statusCode).toBe(200, product);
          done();
        } else {
          expect(res.statusCode).toBe(404, product);
          done();
        }
      });
  });

  it("should respond with the correct content type", done => {
    request(app)
      .get(testUrl + productID)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.get("Content-Type")).toContain(
          "application/json",
          "Got: " + res.get("Content-Type")
        );
        expect(res.get("Content-Type").includes("text")).toBeFalse();
        done();
      });
  });

  it("should respond with the correct data type", done => {
    request(app)
      .get(testUrl + productID)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        // console.log("data type check got", res.body, res.status);
        expect(product).toBeDefined(
          "product needs to be defined for the test to work"
        );
        expect(product).toEqual(
          jasmine.any(Object),
          "product needs to be an object for the test to work"
        );
        expect(res.body.data).toBeDefined("The response body was empty");
        expect(
          res.body.data.__proto__.constructor === {}.__proto__.constructor
        ).toBeTrue("response object should be an object", typeof res.body.data);
        // expect(res.body.data.length).toEqual(1);
        expect(res.body.data.id).toBeDefined(
          "Expected key 'id' to exist on product object"
        );
        expect(res.body.data.id).toEqual(
          jasmine.any(Number),
          "Expected product.id to be a number, got " + typeof product.id
        );
        expect(res.body.data.id).toBeGreaterThan(
          model.id.min - 1,
          "Expected product.id  to be greater than " +
            (model.id.min + 1) +
            "got: " +
            res.body.data.id
        );
        expect(res.body.data.id).toBeLessThan(
          Number.MAX_SAFE_INTEGER,
          "Expected product.id to be less than " + Number.MAX_SAFE_INTEGER
        );
        expect(res.body.data.name).toBeDefined(
          "Expected key 'name' to exist on product object"
        );
        expect(res.body.data.name).toEqual(jasmine.any(String));
        expect(res.body.data.name.length).toBeGreaterThanOrEqual(
          model.name.min,
          `product.name === ${res.body.data.name}`
        );
        expect(res.body.data.name.length).toBeLessThanOrEqual(
          model.name.max,
          `product.name === ${res.body.data.name}`
        );
        expect(res.body.data.description).toBeDefined(
          `Key product.description needs to be defined for product ${res.body.data}`
        );
        if (res.body.data.description != null) {
          expect(res.body.data.description).toEqual(jasmine.any(String));
          expect(res.body.data.description.length).toBeLessThanOrEqual(
            model.description.max
          );
        }
        for (key in product) {
          expect(res.body.data[key]).toBeDefined();
          expect(res.body.data[key]).toEqual(product[key]);
        }
        done();
      });
  });
  // it("should respond with bad request when req.params.id is below the minimum value ", done => {
  //   // expect(req.stat);
  //   if (model.id.min > 0) {
  //     request(app)
  //       .get(testUrl + (model.id.min - 1))
  //       .end((err, res) => {
  //         if (err) {
  //           done(err);
  //         }
  //         expect(res.status).toEqual(400);
  //         done();
  //       });
  //   }
  // });
  // it("should respond with bad request when req.params.id is greater than or equal to the maximum value", done => {
  //   request(app)
  //     .get(testUrl + (model.id.max + 1))
  //     .expect(400, done);
  // });
  // it("should respond to the client with a message describing the out of range condition", done => {
  //   done();
  // });
  // it("should respond with bad request when req.params.id is badly formatted", done => {
  //   request(app)
  //     .get(testUrl + "-1")
  //     .end((err, res) => {
  //       if (err) {
  //         done(err);
  //       }
  //       expect(res.status).toEqual(400);
  //       // res.body should indicate the source of the error
  //       // expect(res.body).toEqual(false)
  //       done();
  //     });
  // });
});
