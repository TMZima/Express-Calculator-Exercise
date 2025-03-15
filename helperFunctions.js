const ExpressError = require("./expressError");

/**
 * Parse and validate a comma-separated list of numbers
 * @param {string} nums - a comma-separated string of numbers
 * @returns {number[]} An array of parsed numbers
 * @throws {Error} If any value in the input string is not a number
 */
function parseNums(nums) {
  const numArray = nums.split(",");
  const parsedNums = [];

  for (let num of numArray) {
    const parsedNum = Number(num);
    if (isNaN(parsedNum)) {
      throw new ExpressError(`${num} is not a number.`, 400);
    }
    parsedNums.push(parsedNum);
  }

  return parsedNums;
}

/**
 * Count the frequencies of elements in an array
 * @param {Array} arr - any array
 * @returns {Object} A frequency counter object
 */
function countFrequencies(arr) {
  return arr.reduce((acc, next) => {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Calculate the mean of a comma-separated list of numbers
 * @param {string} nums - a comma-separated string of numbers
 * @returns {number} The mean (average) of the numbers
 */
function calculateMean(nums) {
  const parsedNums = parseNums(nums);
  const mean =
    parsedNums.reduce((acc, num) => acc + num, 0) / parsedNums.length;
  return mean;
}

/**
 * Calculate the median of a comma-separated list of numbers
 * @param {string} nums - a comma-separated srting of numbers
 * @returns {number} The median of the numbers
 */
function calculateMedian(nums) {
  const parsedNums = parseNums(nums);
  parsedNums.sort((a, b) => a - b);

  const mid = Math.floor(parsedNums.length / 2);

  if (parsedNums.length % 2 === 0) {
    return (parsedNums[mid - 1] + parsedNums[mid]) / 2;
  } else {
    return parsedNums[mid];
  }
}

/**
 * Calculate the mode of a comma-separated list of numbers
 * @param {string} nums - a comma-separted string of numbers
 * @returns {number|number[]} The mode of the numbers
 */
function calculateMode(nums) {
  const parsedNums = parseNums(nums);
  const frequencyCounter = countFrequencies(parsedNums);

  let maxCount = 0;
  let mode = [];

  for (let key in frequencyCounter) {
    if (frequencyCounter[key] > maxCount) {
      maxCount = frequencyCounter[key];
      mode = [Number(key)];
    } else if (frequencyCounter[key] === maxCount) {
      mode.push(Number(key));
    }
  }

  // if all numbers have the same frequency, return a message
  if (mode.length === parsedNums.length) {
    return "No mode found";
  }

  if (mode.length === 1) {
    return mode[0];
  } else {
    return mode;
  }
}

/**
 * Format the JSON response
 * @param {string} operation - The operation performed (mean, median, mode)
 * @param {number|number[]} value - The result of the operation
 * @returns {Object} The formatted JSON response
 */
function formatResponse(operation, value) {
  return { operation, value };
}

module.exports = {
  parseNums,
  countFrequencies,
  calculateMean,
  calculateMedian,
  calculateMode,
  formatResponse,
};
