const AWS = require('aws-sdk');
const handleResponse = require('./handleResponse');

function createSortKey(activityType) {
  let randomNum = '';
  const characters = '0123456789';
  for (let i = 0; i < 13; i += 1) {
    randomNum += characters.charAt(Math.floor(Math.random() * 10));
  }
  const sortKey = randomNum.concat('_', activityType);

  return sortKey;
}

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
    const currentDate = new Date().toISOString();

    if (
      req.body.partitionKey
      && req.body.activityType
      && req.body.actionData
    ) {
      const request = {};
      request.createdAt = currentDate;
      request.partitionKey = req.body.partitionKey;
      request.activityType = req.body.activityType;
      request.sortKey = createSortKey(request.activityType);
      request.actionData = req.body.actionData;

      if (request.activityType === 'LOCATION' && (request.actionData.location.lat) && (request.actionData.location.long)) {
        request.actionData.location = req.body.actionData.location;
      } else if ((request.activityType === 'PHYSICAL_ACTIVITY' || request.activityType === 'BARK') && request.actionData.duration) {
        request.actionData.duration = req.body.actionData.duration;
      } else {
        res.json({
          message: 'Invalid request object',
          statusCode: 400
        });
      }

      const params = {
        TableName: 'code-challenge-203',
        Item: request
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
        message: 'Invalid request object',
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
        message: 'Partition Key and Sort Key required',
        statusCode: 400
      });
    }
  }
  return {
    get, post, remove
  };
}

module.exports = docClientController;
