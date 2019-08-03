const express = require('express');
const bodyParser = require('body-parser');
const DataPacket = require('./models/dataPacket');
const router = require('./routes/collarRouter')(DataPacket);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3999;

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
