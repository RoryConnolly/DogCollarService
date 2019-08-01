const AWS = require('aws-sdk');
const express = require('express');
// const DataPacket = require('./models/dataPacket');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3999;
const table = 'CollarData';

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});

const docClient = new AWS.DynamoDB.DocumentClient();

function handleError(err, res) {
  res.json({
    message: 'server side error',
    statusCode: 500,
    error:
    err
  });
}

function handleSuccess(data, res) {
  res.json({ message: 'success', statusCode: 200, data });
}

router.get('/fetch/ByID', (req, res) => {
  const query = {};
  if (req.query.collarId) {
    query.collarId = req.query.collarId;
  }
  if (req.query.collarResp) {
    query.collarResp = req.query.collarResp;
  }

  const params = {
    TableName: table,
    Key: {
      collarId: query.collarId,
      collarResp: query.collarResp,
    },
  };

  docClient.get(params, (err, data) => {
    if (err) {
      console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
      handleError(err, res);
    } else {
      console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
      handleSuccess(data.Item, res);
    }
  });
});

router.get('/fetch', (req, res) => {
  const params = {
    TableName: table,
  };

  function onScan(err, data) {
    if (err) {
      console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
      handleError(err, res);
    } else {
      console.log('Scan succeeded:', JSON.stringify(data, null, 2));
      handleSuccess(data.Items, res);
    }
  }

  console.log('Scanning for Dog Collar Data');
  docClient.scan(params, onScan);
});

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
