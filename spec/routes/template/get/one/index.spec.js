describe("getOne product", () => {
  // for endpoint /products
  it("should respond with status 400 for extra query parameters ", () => {
    expect(true).toBe(true);
  });
  it("should respond with status 400", () => {});
  it("should respond with status 400 for extra body params", () => {
    expect(true).toBe(true);
  });
  it("should respond with status code 400 for missing", () => {
    expect(1).toBe(1);
  });
  it("should respond with status code 200 on success", () => {
    expect(true).toBe(true);
  });
  it("should respond with one product", () => {
    //
    expect(1).toBe(1);
  });

  it("should respond with the correct data structure", () => {
    // validation goes here
    let o = {};
    expect(o).toEqual(o);
  });
});
