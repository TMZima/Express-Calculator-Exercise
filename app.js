const express = require("express");
const fs = require("fs");
const ExpressError = require("./expressError");
const {
  calculateMean,
  calculateMedian,
  calculateMode,
  formatResponse,
} = require("./helperFunctions");

const app = express();

// Middleware to validate nums query parameter
function validateNums(req, res, next) {
  const nums = req.query.nums;
  if (!nums) {
    return next(new ExpressError("nums are required.", 400));
  }
  req.nums = nums;
  next();
}

// Middleware to handle the save query parameter
function handleSave(req, res, next) {
  const save = req.query.save === "true";
  req.save = save;
  next();
}

// Define routes
app.get("/mean", validateNums, (req, res, next) => {
  try {
    const mean = calculateMean(req.nums);
    res.json(formatResponse("mean", mean));
  } catch (err) {
    next(err);
  }
});

app.get("/median", validateNums, (req, res, next) => {
  try {
    const median = calculateMedian(req.nums);
    res.json(formatResponse("median", median));
  } catch (err) {
    next(err);
  }
});

app.get("/mode", validateNums, (req, res, next) => {
  try {
    const mode = calculateMode(req.nums);
    res.json(formatResponse("mode", mode));
  } catch (err) {
    next(err);
  }
});

app.get("/all", validateNums, handleSave, (req, res, next) => {
  try {
    const mean = calculateMean(req.nums);
    const median = calculateMedian(req.nums);
    const mode = calculateMode(req.nums);
    const response = {
      operation: "all",
      mean,
      median,
      mode,
    };
    if (req.save) {
      saveResult(response);
    }
    sendResponse(req, res, response);
  } catch (err) {
    next(err);
  }
});

// Function to save result to a file with a timestamp
function saveResult(result) {
  const timestamp = new Date().toISOString();
  const data = { ...result, timestamp };
  fs.writeFileSync("results.json", JSON.stringify(data, null, 2));
}

// Function to send response based on Accept header
function sendResponse(req, res, response) {
  if (req.headers.accept === "text/html") {
    res.send(`<pre>${JSON.stringify(response, null, 2)}</pre>`);
  } else {
    res.json(response);
  }
}

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
    error: {
      message: err.message,
      status: err.status,
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
