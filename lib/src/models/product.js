const basePath = "/product";
const basePathPlural = basePath + "s";
model = {
  type: "model",
  name: "Product",
  keys: "id,name,tags,price,description",
  id: {
    type: "number",
    key: "id",
    min: 1,
    format: /^\d+$/,
    max: Number.MAX_SAFE_INTEGER - 1,
    required: true
  },
  name: {
    type: "string",
    format: null,
    min: 3,
    max: 50,
    format: /$[a-zA-Z _]+^/u,
    required: true
  },
  tags: {
    type: "array",
    empty: false,
    items: {
      type: "string"
    },
    required: true
  },
  price: {
    type: "number",
    required: true,
    min: 0
  },
  description: {
    type: "string",
    max: 255,
    required: true
  }
};
rangeError = {
  type: "model",
  name: "RangeError",
  data: {
    type: "object",
    empty: true
  },
  error: {
    type: "object",
    keys: "description,errorDescription,min,max,key",
    description: {
      type: "string",
      empty: false,
      equals: "Range Error"
    },
    errorDescription: {
      type: "string",
      empty: false,
      equals: "The requested index $index was out of bounds"
    },
    min: {
      type: "number",
      ref: "$key.$min"
    },
    max: {
      type: "$number",
      ref: "$key.$max"
    },
    key: {
      type: "string",
      ref: "$key"
    } // this is a reference to the key that caused the error
  }
};
model.name.format = new RegExp(
  `/^[a-zA-Z0-9]{${model.name.min},${model.name.max}}$/`
);
/* define the request model in terms of what we are expecting from the client
  and what the client should send
*/
// if the value of a key of a request method is null or undefined, then the operation is not allowed for that path
let request = {
  [basePathPlural]: {
    // type:"json", // if request[path].type === json, assert that header.include["Content-Type"] === "application/json" and verify the request
    get: {
      type: "json",
      params: {
        request: null,
        query: null, // means there should not be any extra query params on the request, eg the client should send null query params
        body: null // means that the body should be empty
      },
      headers: {
        //include null means that the request is not expected to have extra headers
        include: null //{"Content-Type": "application/json" //declares that the client should send a header satisfying the condition header[key].includes(value) === true}
      }
    }
  },
  [basePath + "/:id"]: {
    get: {
      type: "json",
      params: {
        query: null,
        body: null,
        request: {
          key: "id",
          ...model.id
        }
      },
      headers: null
    }
  },
  [basePath]: {
    post: {
      type: "json",
      params: {
        body: {
          ...model,
          type: "object",
          empty: false
        },
        query: null,
        request: null
      },
      headers: null
    }
  }
};
// note that query is not a valid key in response[path]
let response = {
  [basePathPlural]: {
    get: {
      type: "json",
      header: {
        include: {
          "Content-Type": "application/json"
        }
      },
      responses: {
        200: {
          description: "The product listing",
          body: {
            type: "array",
            empty: false,
            key: "items",
            items: {
              schema: model
            }
          }
        }
      }

      // query:undefined // this key is not allowed, but included for documentation
    }
  },
  [basePath]: {
    get: null,
    post: {
      type: "json",
      header: {
        include: {
          "Content-Type": "application/json"
        }
      },
      responses: {
        201: {
          description: "Product Created Successfully",
          body: {
            ...model,
            type: "object",
            empty: false,
            schema: model
          }
        }
      }
    }
  },
  [basePath + "/:id"]: {
    get: {
      type: "json",
      header: {
        include: {
          "Content-Type": "application/json"
        }
      },
      responses: {
        200: {
          description: "The requested Product",
          body: {
            ...model,
            empty: false
          }
        },
        416: {
          description: "Range Error",
          errorDescription: "The requested index $index was out of bounds",
          body: {
            ...rangeError,
            empty: false
          }
        },
        404: {
          description: "Product Not Found",
          errorDescription: "The requested product with id $id was not found",
          body: {
            type: "object",
            keys: "data,error",
            empty: false,
            data: {
              type: "object",
              empty: true
            },
            error: {
              type: "object",
              keys: "description,errorDescription,id",
              model: {
                description: {
                  type: "string",
                  equals: "Product Not Found"
                },
                errorDescription: {
                  type: "string",
                  equals: "The requested product with id $id was not found",
                  ref: "$id"
                },
                id: {
                  type: model.id.type,
                  equals: "$id",
                  ref: "$id"
                }
              }
            }
          }
        }
      }
    }
  }
};
// eventually need  to add seller id

module.exports = {
  ...model,
  request,
  response,
  rangeError
};
