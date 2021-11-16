const express = require("express");
const logger = require("./config/logger.js");
const noteRouter = require("./app/routes/note.routes.js");
const userRouter = require("./app/routes/user.routes.js");
const db = require("./config/dbConnect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use(express.json());

app.use("/notes", noteRouter);
app.use("/user", userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//connecting to server
const server = app.listen(4000, () => {
  logger.info("Example app listening at port 4000");
  db.dbConnection();
});
