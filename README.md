# DogCollarService
A NodeJS microservice that reads data from dog collars and saves it down to and  a DynamoDB. It also allows for querying and removing data from the DynamoDB.

## Running the App
```bash
# installs all the applications dependencies
npm install
```
```bash
# starts the node application
npm start
```

```bash
# runs es-lint
npm run lint
```

```bash
# runs unit tests
npm run test
```

### Helpful Links (Links are currently Down)
* [Swagger Documentation](http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/swag-docs)
* [GitHub Repository](https://github.com/RoryConnolly/DogCollarService)
* [Post Man Collection](./documentation/DogCollarRequests.postman_collection.json)

-----

# Using this Service

You can use this service in two ways, running it locally or by hitting the deployed endpoint.

## AWS Enpoint

### Quick Links (Links are currently Down)

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/swag-docs

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/fetch/all

The endpoint is publically available at

        http://ec2-52-91-239-59.compute-1.amazonaws.com

Each of the different functions of the service is accessed by adding

        :3000/api

Followed by routes such as:

      /fetch/all
      /fetch/allByPartitionKey
      /fetch/allByActivityType
      /fetch/ByPartitionAndActivity
      /fetch/ByPartitionAndSortKeys
      /remove
      /pushCollarData

  The following routes also require query parameters such as

      /fetch/allByPartitionKey?partitionKey=12345-12345-1ab2cd3
      /fetch/allByActivityType?activityType=PHYSICAL_ACTIVITY
      /fetch/ByPartitionAndActivity?partitionKey=54668-30073-6ad9de2&activityType=BARK
      /fetch/ByPartitionAndSortKeys?partitionKey=54668-30073-6ad9de2&sortKey=1565105507274_BARK
      /remove?partitionKey=54668-30073-6ad9de2&sortKey=1565105507274_LOCATION

  The following route requires a request object:

        /pushCollarData


  Example request object:

            {
            "partitionKey": "12345-12345-1ab2cd3",
            "activityType": "LOCATION",
            "actionData": {
                  "location": {
                        "lat": "11.17",
                        "long": "90.33"
                         }
                  }
            }

## Example Endpoints

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/fetch/ByPartitionAndSortKeys?partitionKey=54668-30073-6ad9de2&sortKey=1565105507274_BARK

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/fetch/ByPartitionAndActivity?partitionKey=54668-30073-6ad9de2&activityType=BARK



----------
## Running Locally

The service can be run locally by cloning this repo and installing the AWS CLI and then in your terminal window running:
```bash
  aws configure
```
You will be prompted for Region (us-east-1), AWS access key and AWS secret access key. These are for accessing the DynamoDb (please contact the repo owner for these). 
Then in your terminal window run:

```bash
  npm install
  npm start
```

You should see a notification in your terminal that your server is now running locally on port:3000. You can now hit this service in your browser using the following urls:

http://localhost:3000/swag-docs   

      Provides swagger documentation for all the locally hosted endpoints

http://localhost:3000/api/fetch/all  

      Returns all the dog collar responses in database
      Caution - may cause performance issues if database is large

http://localhost:3000/api/fetch/allByPartitionKey?partitionKey=12345-12345-1ab2cd3   

      Returns all responses associated with a specific collar
      Takes 'partitionKey' as a query param

http://localhost:3000/api/fetch/ByPartitionAndActivity?partitionKey=54668-30073-6ad9de2&activityType=BARK  

      Returns all responses with a specific partition key and activity type 
      Takes 'partitionKey' and 'activityType' as a query param


http://localhost:3000/api/fetch/ByPartitionAndSortKeys?partitionKey=54668-30073-6ad9de2&sortKey=1565105507274_BARK

      Returns a specific collar responses
      Takes 'partitionKey' and 'sortKey' as query params


http://localhost:3000/api/fetch/allByActivityType?activityType=BARK

      Returns all collar responses with the specified activity type
      Takes 'activityType' as query params

http://localhost:3000/api/remove?partitionKey=12345-12345-1ab2cd3&sortKey=7530742165588_BARK  


      Removes a specific collar repsonses from the database
      Takes 'partitionKey' and 'sortKey' as query params

http://localhost:3000/api/pushCollarData  

      Posts a collar response to the db.
      Requires a request object - see example above


