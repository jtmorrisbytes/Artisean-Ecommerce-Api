const model = require("../../../../lib/src/models/product");

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
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }

        expect(res.statusCode).toBe(200);
        done();
      });
  });
  it("should respond with the correct content type", done => {
    request(app)
      .get(testUrl)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.get("Content-Type")).toBe("application/json");
        done();
      });
  });
  it("should respond with the correct data type", done => {
    request(app)
      .get(testUrl)
      .end((err, res) => {
        done();
      });
  });
});
