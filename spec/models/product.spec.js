const model = require("../../lib/src/models/product");
const config = require("../../lib/src/loadConfig")();
const app = require("../../index");
const supertest = require("supertest");
const { apiBasePath } = config;
console.info("Test suite loaded base path", apiBasePath);
// loop over every path in the model's request field
// each request field is expected to have a complementary response field

function validateBody(nestedObj, method, path, previousKey) {
  // expect(nestedObj).toEqual(
  //   jasmine.any({}.__proto__.constructor),
  //   "schema should be an object when not null " + path
  // );
  // console.log(
  //   "previousKey",
  //   previousKey,
  //   "method: " + method,
  //   "path",
  //   path,
  //   "validateBody: obj",
  //   nestedObj
  // );
  expect(nestedObj.type).toBeDefined(
    `expected 'type' to be defined for key ${previousKey} for method ${method.toUpperCase()} at path ${path}`
  );
  expect(nestedObj.type).toEqual(
    jasmine.any(String),
    "request.params.body should have a type when not null"
  );
  expect(["model", "string", "object", "array", "number"]).toContain(
    nestedObj.type
  );
  if (nestedObj.type === "object") {
    expect(nestedObj.empty).toEqual(jasmine.any(Boolean));

    if (nestedObj.empty === false) {
      expect(nestedObj.keys).toBeDefined(
        `schema needs keys property when type is object for method ${method} at path ${path}`
      );
      expect(nestedObj.keys).toEqual(jasmine.any(String));
      // expect(nestedObj.model).toBeDefined();
      for (let key in nestedObj.keys.split(",").values()) {
        expect(nestedObj[key]).toBeDefined(
          `expected ${key} to be defined in ${nestedObj}`
        );
        if (nestedObj[key].type === "object") {
          validateBody(nestedObj[key], method, path, previousKey || key);
        }
      }
    } else {
      expect(nestedObj.keys).not.toBeDefined(
        "schema property keys should not be defined when object.empty is true"
      );
      expect(nestedObj.model).not.toBeDefined(
        "schema property model should not be defined when object.empty is true"
      );
    }
  } else if (nestedObj.type === "string") {
    if (nestedObj.min) {
      expect(nestedObj.min).toEqual(
        jasmine.any(Number),
        "Expected minimum string length to be a number"
      );
      expect(nestedObj.min.length).toBeGreaterThan(
        0,
        "The minimum String length is 0"
      );
    }
    if (nestedObj.max) {
      expect(nestedObj.min).toEqual(jasmine.any(Number));
    }
    if (nestedObj.max && nestedObj.min) {
      expect(nestedObj.min).toBeLessThan(
        nestedObj.max,
        "Expected maximum string length to be smaller than the minimum string length "
      );
    }
  } else if (nestedObj.type === "array") {
    expect(nestedObj.empty).toBeDefined(
      `Expected ${previousKey} array to have property 'empty'`
    );
    expect(nestedObj.empty).toEqual(
      jasmine.any(Boolean),
      "Schema should have boolean property empty when type is array"
    );
    expect(nestedObj.items).toBeDefined(
      "schema needs items property when type is array"
    );
    expect(nestedObj.items).toEqual(
      jasmine.any(Object),
      "schema key 'items' must be an object"
    );
  } else if (nestedObj.type === "number") {
  }
}
describe("Products", () => {
  // beforeEach(() => {});
  for (let modelPath in model.request) {
    let path = apiBasePath + modelPath;
    it("model should be valid", done => {
      // expect the complimentary path to be defined
      let responseModel = model.response[modelPath];
      let requestModel = model.request[modelPath];
      expect(responseModel).toBeDefined();
      for (requestMethodName in requestModel) {
        let requestMethod = requestModel[requestMethodName];
        let responseMethod = responseModel[requestMethodName];
        expect(requestMethod).toBeDefined();
        expect(responseMethod).toBeDefined();
        if (requestMethod === null) {
          expect(responseMethod).toBeNull(
            `in response for ${requestMethodName.toUpperCase()} ${path}`
          );
        } else {
          expect(responseMethod).not.toBeNull(
            `for response model in ${requestMethodName.toUpperCase()} endpoint: ${path}`
          );
          expect(requestMethod.params).toBeDefined(
            `request method.params for ${requestMethodName.toUpperCase()} at ${path} ${JSON.stringify(
              requestMethod
            )}`
          );
          expect(requestMethod.params.__proto__.constructor).toEqual(
            {}.__proto__.constructor,
            "request params should be an object"
          );
          expect(requestMethod.params.request).toBeDefined(
            `request: object params.request should be defined for method ${requestMethodName.toUpperCase()} at path ${path} `
          );
          expect(requestMethod.params.body).toBeDefined(
            `request: object params.body should be defined for method ${requestMethodName.toUpperCase()} at path ${path} `
          );
          if (
            requestMethod.params.body !== null &&
            requestMethod.params.body !== undefined
          ) {
            validateBody(requestMethod.params.body, path);
          }
          expect(requestMethod.headers).toBeDefined(
            `request: object headers should be defined for method ${requestMethodName.toUpperCase()} at path ${path} `
          );
          expect(requestMethod.type).toBeDefined(
            `request type should be defined for method ${requestMethodName.toUpperCase()} at path ${path} `
          );
          // ******** validate response *****************
          expect(responseMethod.type).toBeDefined(
            `response type should be defined for method ${requestMethodName.toUpperCase()} at path ${path} `
          );
          expect(responseMethod.responses).toBeDefined(
            `response: key 'responses' should be defined  method ${requestMethodName.toUpperCase()} at path ${path}`
          );
          expect(responseMethod.responses).toBeDefined(
            `response: key 'responses' should be defined  method ${requestMethodName.toUpperCase()} at path ${path}`
          );
          expect(responseMethod.responses).toEqual(jasmine.any(Object));
          for (let responseCode in responseMethod.responses) {
            // expect(responseCode).toEqual(jasmine.any(Number));
            let responseModel = responseMethod.responses[responseCode];
            expect(responseModel).toBeDefined(
              "expected response model to be defined"
            );
            expect((+responseCode).toString()).not.toEqual(
              "NaN",
              "response: response code should be convertable to a number"
            );
            expect(responseModel.description).toBeDefined(
              `the response model requires a description for response code ${responseCode} for method '${requestMethodName.toUpperCase()}' at path '${path}'`
            );
            expect(responseModel.body).toBeDefined(
              `the response model requires key 'body' to be defined for response code ${responseCode} for method '${requestMethodName.toUpperCase()}' at path '${path}'`
            );
            validateBody(responseModel.body, requestMethodName, path, "body");
          }
        }

        // expect(
        //   responseModel[requestMethod].__proto__.constructor ===
        //     {}.__proto__.constructor
        // ).toBeTrue();
        console.groupEnd();
      }
      console.log("");
      done();
    });
    it(`should have the correct response for ${path}`, done => {
      let requestModel = model.request[modelPath];
      let responseModel = model.response[modelPath];
      for (let methodName in requestModel) {
        let requestMethod = requestModel[methodName];
        if (requestMethod === null) {
          supertest(app)
            [methodName](path)
            .expect(404, done);
        } else if (requestMethod.params.request) {
          // console.log("this iteration has defined request parameters");
          if (requestMethod.params.request.key) {
            // if request has a single key in url
            if (requestMethod.params.request.type === "number") {
              // and if the request type is a number
              supertest(app)
                [methodName](
                  path.replace(
                    `:${requestMethod.params.request.key}`,
                    "abcdefg"
                  )
                )
                .end((err, req) => {
                  expect(req.statusCode).toBe(
                    400,
                    `${methodName.toUpperCase()} ${path}`
                  );
                  // eventually you should test the response format+
                  console.warn(
                    "WARNING: " +
                      methodName.toUpperCase() +
                      ":" +
                      path +
                      ": the error response format for type number is not being tested yet"
                  );
                  done();
                });
              // done();
              continue;
            } else if (requestMethod.params.request.type === "string") {
              // intentionally send a known bad request to the request handler
              supertest(app)
                [methodName](
                  path.replace(
                    `:${requestMethod.params.request.key}`,
                    Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
                  )
                )
                .end((err, res) => {
                  console.log(response);
                  if (err) {
                    done(err);
                  } else {
                    expect(res.statusCode).toBe(400);
                    // make sure to test the response format
                    console.warn(
                      methodName.toUpperCase() +
                        ":" +
                        path +
                        ": the response format for type string is not being tested"
                    );
                    done();
                  }
                });
            }
          }
        } else if (requestMethod.params.query) {
          console.log(
            "request method query params",
            requestMethod.params.query
          );
          console.info(
            "****tests for requestMethod.params.query have not been implemented yet****\r\n"
          );
          done();
        }

        // supertest(app)[method](path);
      }
      done();
    });
  }
});
