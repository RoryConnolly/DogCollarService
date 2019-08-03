const AWS = require('aws-sdk');

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

function handlePutSuccess(data, res) {
  res.json({ message: 'success', statusCode: 201, data });
}

function clientController() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = 'CollarData';

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
        handleError(err, res);
      } else {
        handleSuccess(data.Item, res);
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
        handleError(err, res);
      } else {
        handlePutSuccess(data.Item, res);
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
        handleError(err, res);
      } else {
        handleSuccess(data.Item, res);
      }
    });
  }
  return { get, post, remove };
}

module.exports = clientController;
