const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/collarRouter')();
const swaggerDoc = require('./documentation/swagger.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/swag-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api', router);

module.exports = app;
