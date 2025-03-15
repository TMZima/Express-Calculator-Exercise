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

module.exports = { parseNums, calculateMean };
