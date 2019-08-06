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
  function getAllByActivityType(req, res) {
    if (req.query.activityType
      && (req.query.activityType === 'BARK'
      || req.query.activityType === 'PHYSICAL_ACTIVITY'
      || req.query.activityType === 'LOCATION')) {
      queryObj.activityType = req.query.activityType;
      const params = {
        TableName: table,
        ExpressionAttributeValues: { ':a': queryObj.activityType },
        FilterExpression: 'activityType = :a'
      };

      docClient.scan(params, (err, data) => {
        if (err) handle.handleError(err, res);
        else handle.handleSuccess(data.Items, res);
      });
    } else {
      res.json({
        message: 'Valid query parameter required',
        statusCode: 400
      });
    }
  }
  function getByPartitionAndActivity(req, res) {
    if ((req.query.partitionKey && req.query.activityType) && (req.query.activityType === 'BARK'
      || req.query.activityType === 'PHYSICAL_ACTIVITY'
      || req.query.activityType === 'LOCATION')) {
      queryObj.partitionKey = req.query.partitionKey;
      queryObj.activityType = req.query.activityType;

      const params = {
        TableName: table,
        ExpressionAttributeValues: {
          ':a': queryObj.activityType,
          ':k': queryObj.partitionKey
        },
        FilterExpression: 'activityType = :a and partitionKey =:k'
      };

      docClient.scan(params, (err, data) => {
        if (err) handle.handleError(err, res);
        else handle.handleSuccess(data.Items, res);
      });
    } else {
      res.json({
        message: 'Valid query parameter required',
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
        message: 'Valid query parameter required',
        statusCode: 400
      });
    }
  }
  return {
    get, getAllByActivityType, getByPartitionAndActivity, getByActivity, getByLocation, getByCollar
  };
}

module.exports = scanController;
