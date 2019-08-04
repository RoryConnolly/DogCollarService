function handleResponse() {
  function handleSuccess(data, res) {
    res.json({
      message: 'success',
      statusCode: 200,
      data
    });
  }

  function handlePostSuccess(res) {
    res.json({
      message: 'successfully added to the db',
      statusCode: 201
    });
  }

  function handleError(err, res) {
    res.json({
      message: 'server side error',
      statusCode: 500,
      error: err
    });
  }
  return { handleError, handlePostSuccess, handleSuccess };
}
module.exports = handleResponse;
