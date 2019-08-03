const AWS = require('aws-sdk');
const handleSuccess = require('./handleResponse');

function clientController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'CollarData';
  const handle = handleSuccess();

  function get(req, res) {
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
        handle.handleError(err, res);
      } else {
        handle.handleSuccess(data.Item, res);
      }
    });
  }
  function post(req, res) {
    const params = {
      TableName: table,
      Item: req.body
    };

    docClient.put(params, (err, data) => {
      if (err) {
        handle.handleError(err, res);
      } else {
        handle.handlePutSuccess(data.Item, res);
      }
    });
  }
  function remove(req, res) {
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

    // TODO do proper codes for delete 204
    docClient.delete(params, (err, data) => {
      if (err) {
        handle.handleError(err, res);
      } else {
        handle.handleSuccess(data.Item, res);
      }
    });
  }
  return { get, post, remove };
}

module.exports = clientController;
