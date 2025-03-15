const {
  parseNums,
  calculateMean,
  calculateMedian,
  calculateMode,
} = require("./helperFunctions");
const ExpressError = require("./expressError");

describe("parseNums", () => {
  test("parses a comma-separated list of numbers", () => {
    expect(parseNums("1,2,3")).toEqual([1, 2, 3]);
  });

  test("throws an error if any value is not a number", () => {
    expect(() => parseNums("1,foo,3")).toThrow(ExpressError);
  });
});

describe("calculateMean", () => {
  test("calculates the mean of a comma-separated list of numbers", () => {
    expect(calculateMean("1,2,3")).toBe(2);
  });
});

describe("calculateMedian", () => {
  test("calculates the median of a comma-separated list of numbers", () => {
    expect(calculateMedian("1,2,3")).toBe(2);
    expect(calculateMedian("1,2,3,4")).toBe(2.5);
  });
});

describe("calculateMode", () => {
  test("calculates the mode of a comma-separated list of numbers", () => {
    expect(calculateMode("1,2,2,3,3,3")).toBe(3);
    expect(calculateMode("1,2,3,4,5")).toBe("No mode found");
  });
});
