const AWS = require('aws-sdk');
const express = require('express');
const clientController = require('../controllers/docClientController');
const scanController = require('../controllers/scanController');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});


function routes() {
  const router = express.Router();
  const controller = clientController();
  const scController = scanController();

  router.route('/fetch/all').get(scController.get);
  router.route('/fetch/allByCollarId').get(scController.getByCollar);
  router.route('/fetch/allByBarking').get(scController.getByBarking);
  router.route('/fetch/allByActivity').get(scController.getByActivity);
  router.route('/fetch/allByLocation').get(scController.getByLocation);
  router.route('/fetch/SpecificCollarRespByID').get(controller.get);
  router.route('/remove').delete(controller.remove);
  router.route('/pushCollarData').post(controller.post);

  return router;
}

module.exports = routes;
