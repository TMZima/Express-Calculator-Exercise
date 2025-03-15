const express = require("express");
const ExpressError = require("./expressError");
const { calculateMean } = require("./helperFunctions");

const app = express();

app.get("/mean", (req, res, next) => {
  // get the nums query parameter
  const nums = req.query.nums;

  // check if nums is provided
  if (!nums) {
    return next(new ExpressError("nums are required.", 400));
  }

  try {
    const mean = calculateMean(nums);
    res.json({ operation: "mean", value: mean });
  } catch (err) {
    next(err);
  }
});

/** Error handling middleware */

// Handle 404 errors
app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

app.listen(3000);
