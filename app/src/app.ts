import express = require("express");
import * as bodyParser from "body-parser";
import "./controllers/healthcheck-controller";
import "./controllers/node-controller";
import * as routes from "./generated/routes";
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument = require("./generated/swagger.json");

import * as dotenv from "dotenv";
dotenv.config();

const port = 3010; // default port to listen

// Create a new express application instance
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.RegisterRoutes(app);
swaggerDocument.host = "localhost:" + port;
swaggerDocument.schemes = ["http"];

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
