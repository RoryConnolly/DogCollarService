const AWS = require('aws-sdk');
const handleResponse = require('./handleResponse');

// a controller function for all the scan actions
function scanController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'code-challenge-203';
  const handle = handleResponse();
  const queryObj = {};

  // a function returns everything in the table
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
  // A function that returns everything in the table with the specified Activity Type
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
  // A function that returns everything that matches the supplied Partition Key and Activity Type
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
  // A function that returns everything in a specific partition
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
    get, getAllByActivityType, getByPartitionAndActivity, getByCollar
  };
}

module.exports = scanController;
