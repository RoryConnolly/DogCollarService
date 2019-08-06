const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});

const docClient = new AWS.DynamoDB.DocumentClient();
// eslint-disable-next-line no-console
console.log('Importing collar data into DynamoDB. Please wait.');

const mockData = JSON.parse(fs.readFileSync('mockData.json', 'utf8'));
mockData.forEach((response) => {
  const params = {
    TableName: 'code-challenge-203',
    Item: {
      partitionKey: response.partitionKey,
      sortKey: response.sortKey,
      barking: response.barking,
      activity: response.activity,
      location: response.location,
      dogName: response.dogName
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
