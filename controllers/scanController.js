const AWS = require('aws-sdk');
const handleSuccess = require('./handleResponse');

function scanController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'CollarData';
  const handle = handleSuccess();
  const queryObj = {};

  function get(req, res) {
    const params = {
      TableName: table,
    };
    docClient.scan(params, (err, data) => {
      if (err) {
        handle.handleError(err, res);
      } else {
        handle.handleSuccess(data.Items, res);
      }
    });
  }
  function getByBarking(req, res) {
    if (req.query.barking) {
      queryObj.barking = req.query.barking;
      const params = {
        TableName: table,
        ExpressionAttributeValues: { ':b': queryObj.barking },
        FilterExpression: 'barking = :b'
      };

      docClient.scan(params, (err, data) => {
        if (err) handle.handleError(err, res);
        else handle.handleSuccess(data.Items, res);
      });
    } else {
      res.status(400);
      res.send('Barking value required: i.e. barking=medium');
    }
  }
  function getByActivity(req, res) {
    if (req.query.activity) {
      queryObj.activity = req.query.activity;
      const params = {
        TableName: table,
        ExpressionAttributeValues: { ':a': queryObj.activity },
        FilterExpression: 'activity = :a'
      };

      docClient.scan(params, (err, data) => {
        if (err) handle.handleError(err, res);
        else handle.handleSuccess(data.Items, res);
      });
    } else {
      res.status(400);
      res.send('Activity value required: i.e. activity=low');
    }
  }
  function getByLocation(req, res) {
    if (req.query.location) {
      queryObj.location = req.query.location;
      const params = {
        TableName: table,
        ExpressionAttributeNames: { '#location': 'location' },
        ExpressionAttributeValues: { ':l': queryObj.location },
        FilterExpression: '#location = :l'
      };

      docClient.scan(params, (err, data) => {
        if (err) handle.handleError(err, res);
        else handle.handleSuccess(data.Items, res);
      });
    } else {
      res.status(400);
      res.send('Location (zipcode) value required: i.e. location=37901');
    }
  }
  return {
    get, getByBarking, getByActivity, getByLocation
  };
}

module.exports = scanController;
