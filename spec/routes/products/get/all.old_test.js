const model = require("../../../../lib/src/models/product");
const data = require("../../../../src/routes/products/data.json");
const request = require("supertest");
describe("getAll products", () => {
  let app;
  beforeEach(() => {
    app = require("../../../../index");
  });
  afterEach(() => {
    app = null;
  });
  let testUrl = "/api/products";
  it("should determine its exisance by responding with status 200", done => {
    //
    request(app)
      .get(testUrl)
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
        expect(res.body).toBeDefined("The response body was empty");
        expect(
          res.body.__proto__.constructor === [].__proto__.constructor
        ).toBeTrue();
        res.body.forEach(product => {
          expect(
            product.__proto__.constructor === {}.__proto__.constructor
          ).toBeTrue("Expecting the items in the response array to be objects");
          expect(product.id).toBeDefined(
            "Expected key 'id' to exist on product object"
          );
          expect(product.id).toEqual(
            jasmine.any(Number),
            "Expected product.id to be a number, got " + typeof product.id
          );
          expect(product.id).toBeGreaterThan(
            0,
            "Expected product.id to be greater than zero, got " + product.id
          );
          expect(product.id).toBeLessThan(
            Number.MAX_SAFE_INTEGER,
            "Expected product.id to be less than " + Number.MAX_SAFE_INTEGER
          );
          expect(product.name).toBeDefined(
            "Expected key 'name' to exist on product object"
          );
          expect(product.name).toEqual(jasmine.any(String));
          expect(product.name.length).toBeGreaterThanOrEqual(
            model.modelInfo.name.min,
            `product.name === ${product.name}`
          );
          expect(product.name.length).toBeLessThanOrEqual(
            model.modelInfo.name.max,
            `product.name === ${product.name}`
          );
          expect(product.description).toBeDefined(
            `Key product.description needs to be defined for product ${product}`
          );
          if (product.description != null) {
            expect(product.description).toEqual(jasmine.any(String));
            expect(product.description.length).toBeLessThanOrEqual(
              model.modelInfo.description.max
            );
          }
        });

        done();
      });
  });
});
