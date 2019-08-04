const AWS = require('aws-sdk');
const handleResponse = require('./handleResponse');

function clientController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'CollarData';
  const handle = handleResponse();
  const queryObj = {};

  function get(req, res) {
    if (req.query.collarId && req.query.collarResp) {
      queryObj.collarId = req.query.collarId;
      queryObj.collarResp = req.query.collarResp;

      const params = {
        TableName: table,
        Key: {
          collarId: queryObj.collarId,
          collarResp: queryObj.collarResp,
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
      res.status(400);
      res.send('Collar ID and Collar params required, i.e. collarId=abc2&collarResp=3');
    }
  }

  function post(req, res) {
    if (
      req.body.collarId
      && req.body.collarResp
      && req.body.barking
      && req.body.activity
      && req.body.location
      && req.body.dogName
    ) {
      const params = {
        TableName: 'CollarData',
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
      res.status(400);
      res.send('Invalid Schema i.e. activity: low, location: 37901, barking: high, dogName: Bouncer, collarResp: 5, collarId: abc6');
    }
  }

  function remove(req, res) {
    if (req.query.collarId && req.query.collarResp) {
      queryObj.collarId = req.query.collarId;
      queryObj.collarResp = req.query.collarResp;

      const params = {
        TableName: table,
        Key: {
          collarId: queryObj.collarId,
          collarResp: queryObj.collarResp,
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
      res.status(400);
      res.send('Collar ID and Collar params required, i.e. collarId=abc2&collarResp=3');
    }
  }
  return {
    get, post, remove
  };
}

module.exports = clientController;
