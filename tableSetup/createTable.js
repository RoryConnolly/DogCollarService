const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'CollarData',
  KeySchema: [
    { AttributeName: 'collarId', KeyType: 'HASH' }, // Partition key
    { AttributeName: 'collarResp', KeyType: 'RANGE' } // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'collarId', AttributeType: 'S' },
    { AttributeName: 'collarResp', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

rdynamodb.createTable(params, (err, data) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    // eslint-disable-next-line no-consoles
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
