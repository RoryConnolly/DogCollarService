const AWS = require('aws-sdk');
const express = require('express');
const clientController = require('../controllers/docClientController');
const scanController = require('../controllers/scanController');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});

// A selection of routes to all the functions of the service
function routes() {
  const router = express.Router();
  const controller = clientController();
  const scController = scanController();

  router.route('/fetch/all').get(scController.get);
  router.route('/fetch/allByPartitionKey').get(scController.getByCollar);
  router.route('/fetch/ByPartitionAndActivity').get(scController.getByPartitionAndActivity);
  router.route('/fetch/allByActivityType').get(scController.getAllByActivityType);
  router.route('/fetch/ByPartitionAndSortKeys').get(controller.get);
  router.route('/remove').delete(controller.remove);
  router.route('/pushCollarData').post(controller.post);

  return router;
}

module.exports = routes;
