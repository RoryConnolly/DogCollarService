const express = require('express');
const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
const router = require('./routes/collarRouter')();
// const swaggerDoc = require('./swagger.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3999;

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.use('/api', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

module.exports = app;
