const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const errorMiddleware = require("./middleware/error");

const app = express();
const swaggerJSDoc = require("swagger-jSdoc");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config({ path: "config/config.env" });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));

app.use(cors());
app.options("*", cors());

// swagger options

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js Test API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes imports
const userRoutes = require("./routes/userRoute");
const departmentRoutes = require("./routes/departmentRoute");
/**
 * @swagger
 * /api/v1/all_users:
 *  get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *         200:
 *             description: Get all users
 */
app.use("/api/v1", userRoutes);
app.use("/api/v1", departmentRoutes);

/**
 * @swagger
 * /:
 *  get:
 *     summary: check server is working or not
 *     description: check server is working
 *     responses:
 *         200:
 *             description: Get method is working
 */
app.get("/", function (req, res) {
  res.json("API's are working !");
});

app.use(errorMiddleware);
module.exports = app;
