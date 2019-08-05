const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/collarRouter')();
const swaggerDoc = require('./swagger.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/swag-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api', router);

module.exports = app;

// app.get('/', (req, res) => {
//   res.send('Welcome to my Nodemon API!');
// });


// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Running on port ${port}`);
// });


