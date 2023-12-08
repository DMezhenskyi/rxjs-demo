const express = require("express");
const cors = require("cors");
const app = express();
const throwRandomlyErrors = false;

// Middleware for parsing JSON bodies
app.use(cors());
app.use(express.json());

// Middleware to simulate a 3-second delay and randomly throw a 500 error
app.use("/save", (req, res, next) => {
  setTimeout(() => {
    if (Math.random() < 0.5 && throwRandomlyErrors) {
      // Simulating a server error
      res.status(500).send("Internal Server Error");
    } else {
      next();
    }
  }, 3000); // 3-second delay
});

// Handling the 'save' route as a POST request
app.post("/save", (req, res) => {
  res.json({
    message: "Data saved successfully",
    data: req.body,
  });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
