const AWS = require('aws-sdk');
const handleResponse = require('./handleResponse');

function docClientController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'code-challenge-203';
  const handle = handleResponse();
  const queryObj = {};

  function get(req, res) {
    if (req.query.partitionKey && req.query.sortKey) {
      queryObj.partitionKey = req.query.partitionKey;
      queryObj.sortKey = req.query.sortKey;

      const params = {
        TableName: table,
        Key: {
          partitionKey: queryObj.partitionKey,
          sortKey: queryObj.sortKey,
        },
      };

      docClient.get(params, (err, data) => {
        if (err) {
          handle.handleError(err, res);
        } else {
          handle.handleSuccess(data.Item, res);
        }
      });
    } else {
      res.json({
        message: 'Partition Key and Sort Key params required, i.e. partitionKey=abc2&sortKey=3',
        statusCode: 400
      });
    }
  }

  function post(req, res) {
    if (
      req.body.partitionKey
      && req.body.sortKey
      && req.body.barking
      && req.body.activity
      && req.body.location
      && req.body.dogName
    ) {
      const params = {
        TableName: 'code-challenge-203',
        Item: req.body
      };

      docClient.put(params, (err) => {
        if (err) {
          handle.handleError(err, res);
        } else {
          handle.handlePostSuccess(res);
        }
      });
    } else {
      res.json({
        message: 'Invalid Schema i.e. activity: low, location: 37901, barking: high, dogName: Bouncer, sortKey: 5, partitionKey: abc6',
        statusCode: 400
      });
    }
  }

  function remove(req, res) {
    if (req.query.partitionKey && req.query.sortKey) {
      queryObj.partitionKey = req.query.partitionKey;
      queryObj.sortKey = req.query.sortKey;

      const params = {
        TableName: table,
        Key: {
          partitionKey: queryObj.partitionKey,
          sortKey: queryObj.sortKey,
        },
      };

      // TODO do proper codes for delete 204
      docClient.delete(params, (err, data) => {
        if (err) {
          handle.handleError(err, res);
        } else {
          handle.handleSuccess(data.Item, res);
        }
      });
    } else {
      res.json({
        message: 'Partition Key and Sort Key required, i.e. partitionKey=abc2&sortKey=3',
        statusCode: 400
      });
    }
  }
  return {
    get, post, remove
  };
}

module.exports = docClientController;
