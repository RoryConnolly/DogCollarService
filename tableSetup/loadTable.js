const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});

// A file to quickly load data from mockData.json into the table
// Can be run in the terminal by typing 'node loadTable'
const docClient = new AWS.DynamoDB.DocumentClient();
// eslint-disable-next-line no-console
console.log('Importing collar data into DynamoDB table DogCollarData. Please wait.');

const mockData = JSON.parse(fs.readFileSync('mockData.json', 'utf8'));
mockData.forEach((response) => {
  const params = {
    TableName: 'DogCollarData',
    Item: {
      partitionKey: response.partitionKey,
      sortKey: response.sortKey,
      activityType: response.activityType,
      activity: response.activity,
      actionData: response.actionData,
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Unable to add collar', response.partitionKey, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      // eslint-disable-next-line no-console
      console.log('PutItem succeeded:', JSON.stringify(data, null, 2));
    }
  });
});
