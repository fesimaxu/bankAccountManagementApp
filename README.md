# BANK ACCOUNT MANAGEMENT APP

# A REST API with Node.js, JSON File & TypeScript

## Project Overview:
The Bank Account Management API project aims to create a robust and secure system for managing bank accounts. It involves three key endpoints: creating a bank account, resolving an account, and fetching all bank accounts. Below is the design setup for this project:

Note: This repository includes the [postman collection for the finished API](postman_collection.json)

Added .env, node_modules, and dist to my .gitignore before pushing any changes to your repository. 

## Common issues
* Managing environment variables

## Architecture:

Backend Framework: Node.js with Express.js
Database: Json File for storing account data
API Documentation: Postman for clear API documentation
Validation: Zod for user's Json payload validation
Version Control: Git and GitHub for collaborative development
Deployment: Render for hosting

## Concepts
* REST API principals
    * CRUD
    * HTTP methods
* Request validation

## Tools Used
* Postman
* An IDE or text editor (VS Code)
* A package manager such as NPM or Yarn
* Node.js installed

## Technologies
* Node.js
* TypeScript
* Express.js & Express.js middleware
* Zod validation

## Folder Structure:

* src: Contains the application source code.
* controllers: Handle request and response logic.
* models: Define database models.
* routes: Define API endpoints.
* middlewares: Implement middleware functions (error handling middlware).
* config: Store configuration files.
* tests: Contains unit and integration tests.
* docs: Stores API documentation files.

## Design Structure
## Database Design:

* Array: Create objects for storing account data.
* accounts: Store account information (e.g., account number, holder name, DOB, account type, balance).

## API Endpoints:

## Endpoint 1: Create a Bank Account (POST /api/createaccount)

* Receives JSON payload with account details.
* Validates data.
* Generates a unique 10-digit account number.
* Stores data in the database.
* Responds with the account number.

## Endpoint 2: Resolve a Bank Account (GET /api/accounts/accountnumber)

* Accepts an account number as a parameter.
* Retrieves account details from the database.
* Responds with account information.

## Endpoint 3: Fetch All Bank Accounts (GET /api/accounts)

* Retrieves all account details from the database.
* Responds with an array of account objects.

## Error Handling:

* Implement a robust error-handling mechanism.
* Provide clear and informative error messages in the API responses.

## Testing:

* Write unit tests for controllers, models, and middleware.
* Write integration tests to test the API endpoints.
* Use testing libraries like Jest and Supertest.
## Documentation:

* Generate API documentation using Swagger or a similar tool.
* Include detailed information about how to use each endpoint

## Versioning:
* Implement API versioning to ensure backward compatibility.
  
# Deployment
* Render - Web server

