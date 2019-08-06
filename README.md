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

### Helpful Links
* [Swagger Documentation](http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/swag-docs)
* [GitHub Repository](https://github.com/RoryConnolly/DogCollarService)
* [Post Man Collection](./documentation/DogCollar.postmanCollection.json)

-----

# Using this Service

You can use this service in two ways, running it locally or by hitting the deployed endpoint.

## AWS Enpoint

### Quick Links

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/swag-docs

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/fetch/all

The endpoint is publically available at

        http://ec2-52-91-239-59.compute-1.amazonaws.com

Each of the different functions of the service is accessed by adding

        :3000/api

Followed by routes such as:

        /fetch/all
        /fetch/allByCollarId
        /fetch/SpecificCollarRespByID
        /fetch/allByBarking
        /fetch/allByActivity
        /fetch/allByLocation
        /remove
        /pushCollarData


  The following routes also require query parameters such as

        /fetch/allByCollarId?collarId=abc3
        /fetch/SpecificCollarRespByID?collarId=abc1&collarResp=1
        /fetch/allByBarking?barking=low
        /fetch/allByActivity?activity=low
        /fetch/allByLocation?location=37901
        /remove?collarId=abc3&collarResp=11

  The following route requires a request object:

        /pushCollarData


  Example request object:

        {
          activity: "medium",
          location: "90210",
          barking: "low",
          dogName: "Dash",
          collarResp: "1",
          collarId: "abc1"
        }

## Example Endpoints

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/fetch/SpecificCollarRespByID?collarId=abc1&collarResp=1

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/fetch/allByBarking?barking=low

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/allByLocation?location=37901

http://ec2-52-91-239-59.compute-1.amazonaws.com:3000/api/fetch/allByActivity?activity=low

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

http://localhost:3000/api/fetch/allByCollarId?collarId=abc3   

      Returns all responses associated with a specific collar
      Takes 'collarId' as a query param

http://localhost:3000/api/fetch/allByBarking?barking=low  

      Returns all responses with a specific level of barking
      Takes 'barking' as a query param

http://localhost:3000/api/fetch/allByActivity?activity=low   

      Returns all responses with a specific level of activity
      Takes 'activity' as a query param

http://localhost:3000/api/fetch/allByLocation?location=37901  

      Returns all responses within a specific zipcode
      Takes 'location' as a query param

http://localhost:3000/api/fetch/SpecificCollarRespByID?collarId=abc1&collarResp=1  

      Returns a specific collar responses
      Takes 'collarId' and 'collarResp' as query params

http://localhost:3000/api/remove?collarId=abc3&collarResp=11  

      Removes a specific collar repsonses from the database
      Takes 'collarId' and 'collarResp' as query params

http://localhost:3000/api/pushCollarData  

      Returns a specific collar responses
      Takes 'collarId' and 'collarResp' as query params(this one requires a request object - see example above)


