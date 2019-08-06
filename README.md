# DogCollarService
A NodeJS microservice that reads data from dog collars and saves it down to and queries a DynamoDB

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
* [Swagger Documentation](http://ec2-52-91-239-59.compute-1.amazonaws.com:3999/swag-docs)
* [GitHub Repository](https://github.com/RoryConnolly/DogCollarService)
* [Post Man Collection](./documentation/DogCollar.postmanCollection.json)

-----

# Using this Service

You can use this service in two ways, locally or by hitting the deployed endpoint. 

## AWS Enpoint

http://ec2-52-91-239-59.compute-1.amazonaws.com:3999/api/swag-docs


## Running Locally

It can be run locally by cloning this repo and installing AWS CLI and then in your terminal window running:

* aws configure

You will be prompted for aws access key and aws secret access key. These are for accessing the DynamoDb (please contact the repo owner for these).
Then in your terminal window run:


* npm install
* npm start


You should see a notification in your terminal that your server is now running locally on port:3000. You can now hit this service in your browser using the following urls:

http://localhost:3000/api/swag-docs

http://localhost:3000/api/fetch/all (returns all dog collar response in db - caution may cause performance issues if db is large)

http://localhost:3000/api/fetch/allByCollarId?collarId=abc3 (returns all responses associated with a specific collar. Takes 'collarId' as a param)

http://localhost:3000/api/fetch/allByBarking?barking=low (returns all responses with a specific level of barking. Takes 'barking' as a param)

http://localhost:3000/api/fetch/allByActivity?activity=low (returns all responses with a specific level of activity. Takes 'activity' as a param)

http://localhost:3000/api/fetch/allByLocation?location=37901

http://localhost:3000/api/fetch/SpecificCollarRespByID?collarId=abc1&collarResp=1

http://localhost:3000/api/remove?collarId=abc3&collarResp=11

http://localhost:3000/api/pushCollarData  (this one requires a request object)




We are following the conventional commit [spec](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) to allow for easier changelog management. The general format for a commit message should look like:

With our configuration, the following types are allowed:
* low - Used when making updates to the documentation for the application
* medium - Used with adding a new feature to the application
* high - Used when fixing a bug within the application



Starts the application

![Test Coverage](./resources/NpmStart.png)

You will see the linting errors


You will see the Instabul provided test coverages when test is run

