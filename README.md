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


## Commit Requirements
We are following the conventional commit [spec](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) to allow for easier changelog management. The general format for a commit message should look like:

With our configuration, the following types are allowed:
* low - Used when making updates to the documentation for the application
* medium - Used with adding a new feature to the application
* high - Used when fixing a bug within the application



Starts the application

![Test Coverage](./resources/NpmStart.png)

You will see the linting errors

![Test Coverage](./resources/Lint.png)

You will see the Instabul provided test coverages when test is run

![Test Coverage](./resources/testCoverage.png)