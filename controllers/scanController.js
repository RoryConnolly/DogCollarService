const AWS = require('aws-sdk');
const handleResponse = require('./handleResponse');

function scanController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'code-challenge-203';
  const handle = handleResponse();
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
      res.json({
        message: 'Barking value required: i.e. barking=medium',
        statusCode: 400
      });
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
      res.json({
        message: 'Activity value required: i.e. activity=low',
        statusCode: 400
      });
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
      res.json({
        message: 'Location (zipcode) value required: i.e. location=37901',
        statusCode: 400
      });
    }
  }
  function getByCollar(req, res) {
    if (req.query.partitionKey) {
      queryObj.partitionKey = req.query.partitionKey;
      const params = {
        TableName: table,
        ExpressionAttributeValues: { ':a': queryObj.partitionKey },
        FilterExpression: 'partitionKey = :a'
      };

      docClient.scan(params, (err, data) => {
        if (err) handle.handleError(err, res);
        else handle.handleSuccess(data.Items, res);
      });
    } else {
      res.json({
        message: 'partitionKey value required: i.e. partitionKey=abc1',
        statusCode: 400
      });
    }
  }
  return {
    get, getByBarking, getByActivity, getByLocation, getByCollar
  };
}

module.exports = scanController;
