const express = require("express");
require("express-async-errors");
require("dotenv").config();

const cors = require("cors");
const port = process.env.PORT || 5001;
const errorHandler = require("./middlewares/error-handler");
const usersRoutes = require("./routes/users.routes");
const companiesRoutes = require("./routes/companies.routes");
const jobsRoutes = require("./routes/jobs.routes");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/users", usersRoutes);
server.use("/companies", companiesRoutes);
server.use("/jobs", jobsRoutes);

server.get("/", (req, res) => {
  res.send("Hello world");
});

server.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = server;
