const model = require("../../../../lib/src/models/product");
const data = require("../../../../src/routes/products/data.json");
const request = require("supertest");
describe("get One product by id", () => {
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
  afterEach(() => {
    app = null;
  });
  let testUrl = "/api/product/";
  if (product) {
    it("should determine its exisance by responding with status 200", done => {
      //
      request(app)
        .get(testUrl + productID)
        .expect(200, done);
    });
    it("should respond with the correct content type", done => {
      request(app)
        .get(testUrl)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.get("Content-Type")).toContain("application/json");
          expect(res.get("Content-Type").includes("text")).toBeFalse();
          done();
        });
    });

    it("should respond with the correct data type", done => {
      request(app)
        .get(testUrl)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          let response = res.body[0];
          expect(res.body).toBeDefined("The response body was empty");
          expect(
            res.body.__proto__.constructor === [].__proto__.constructor
          ).toBeTrue("response object should be an array");
          expect(res.body.length).toEqual(1);
          expect(response.id).toBeDefined(
            "Expected key 'id' to exist on product object"
          );
          expect(response.id).toEqual(
            jasmine.any(Number),
            "Expected product.id to be a number, got " + typeof product.id
          );
          expect(response.id).toBeGreaterThan(
            0,
            "Expected product.id to be greater than zero, got " + response.id
          );
          expect(response.id).toBeLessThan(
            Number.MAX_SAFE_INTEGER,
            "Expected product.id to be less than " + Number.MAX_SAFE_INTEGER
          );
          expect(response.name).toBeDefined(
            "Expected key 'name' to exist on product object"
          );
          expect(response.name).toEqual(jasmine.any(String));
          expect(response.name.length).toBeGreaterThanOrEqual(
            model.modelInfo.name.min,
            `product.name === ${response.name}`
          );
          expect(response.name.length).toBeLessThanOrEqual(
            model.modelInfo.name.max,
            `product.name === ${response.name}`
          );
          expect(response.description).toBeDefined(
            `Key product.description needs to be defined for product ${response}`
          );
          if (response.description != null) {
            expect(response.description).toEqual(jasmine.any(String));
            expect(response.description.length).toBeLessThanOrEqual(
              model.modelInfo.description.max
            );
          }
          for (key in product) {
            expect(response[key]).toBeDefined();
            expect(response[key]).toEqual(product[key]);
          }
          done();
        });
    });
  }
  it("should respond with bad request when req.params.id is out of range ", done => {
    // expect(req.stat);
    if (model.modelInfo.id.min > 0) {
      request(app)
        .get(testUrl + (model.modelInfo.id.min - 1))
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.status).toEqual(400);
          done();
        });
    }
  });
  it("should respond with bad request when req.params.id is badly formatted", done => {
    request(app)
      .get(testUrl + "-1")
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toEqual(400);
        // res.body should indicate the source of the error
        // expect(res.body).toEqual(false)
      });
    done();
  });
});
