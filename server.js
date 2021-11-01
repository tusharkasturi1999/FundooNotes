/**
 * @module
 * @description
 * @version
 * @author
 */
const express = require('express');
const logger = require('./config/logger.js');
const noteRouter = require('./app/routes/note.routes.js');
const userRouter = require('./app/routes/user.routes.js');
const db = require('./config/dbConnect')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
var cors = require('cors')

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use('/notes',noteRouter)
app.use('/user', cors(corsOptions),userRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//connecting to server
const server = app.listen(4000, () => {
   logger.info("Example app listening at port 4000");
   db.dbConnection();
})