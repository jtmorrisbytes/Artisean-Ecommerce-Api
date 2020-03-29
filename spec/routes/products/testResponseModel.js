const model = require("../../../lib/src/models/product");

module.exports = function testProductResponseModel(product) {
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
};
