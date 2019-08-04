function handleResponse() {
  function handleSuccess(data, res) {
    res.json({
      message: 'success',
      statusCode: 200,
      data
    });
  }

  function handlePutSuccess(data, res) {
    res.json({
      message: 'success',
      statusCode: 201,
      data
    });
  }

  function handleError(err, res) {
    res.json({
      message: 'server side error',
      statusCode: 500,
      error:
    err
    });
  }
  return { handleError, handlePutSuccess, handleSuccess };
}
module.exports = handleResponse;
