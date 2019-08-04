const AWS = require('aws-sdk');
const handleSuccess = require('./handleResponse');

function clientController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'CollarData';
  const handle = handleSuccess();
  const queryObj = {};

  function get(req, res) {
    if (req.query.collarId) {
      queryObj.collarId = req.query.collarId;
    }
    if (req.query.collarResp) {
      queryObj.collarResp = req.query.collarResp;
    }

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
  }

  function post(req, res) {
    const params = {
      TableName: 'CollarData',
      Item: req.body
    };

    if (req.body.collarId && req.body.collarResp) {
      docClient.put(params, (err, data) => {
        if (err) {
          handle.handleError(err, res);
        } else {
          handle.handlePutSuccess(data.Item, res);
        }
      });
    } else {
      res.status(400);
      res.send('Collar ID and Collar Response required');
    }
  }
  function remove(req, res) {
    if (req.query.collarId) {
      queryObj.collarId = req.query.collarId;
    }
    if (req.query.collarResp) {
      queryObj.collarResp = req.query.collarResp;
    }

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
  }
  return {
    get, post, remove
  };
}

module.exports = clientController;
