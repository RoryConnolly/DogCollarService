const AWS = require('aws-sdk');
const express = require('express');
const clientController = require('../controllers/clientController');
const scanController = require('../controllers/scanController');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});


function routes() {
  const router = express.Router();
  const controller = clientController();
  const scController = scanController();

  // router.route('/query').get(controller.query);
  router.route('/fetch/ByID').get(controller.get);
  router.route('/collar').post(controller.post);
  router.route('/remove').delete(controller.remove);
  router.route('/fetch/all').get(scController.get);
  router.route('/fetch/allByBarking').get(scController.getByBarking);
  router.route('/fetch/allByActivity').get(scController.getByActivity);
  router.route('/fetch/allByLocation').get(scController.getByLocation);

  return router;
}

module.exports = routes;
