# PetShop Backend Application

Welcome to the PetShop Backend application, where you can manage and adopt pets.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Database Setup](#database-setup)
    - [Configuration](#configuration)
    - [Running the Application](#running-the-application)
- [API Controllers](#api-controllers)
- [Available Endpoints](#available-endpoints)
    - [Auth Controller](#auth-controller)
    - [Pets Controller](#pets-controller)
    - [Test Controller](#test-controller)

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Java Development Kit (JDK) - [Download JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
- MySQL Database Server - [MySQL Installation Guide](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/)
- Integrated Development Environment (IDE) for Java, like IntelliJ IDEA or Eclipse.

## Getting Started

To get started with the PetShop Backend application, follow these steps:

### Database Setup

1. Start a MySQL database server on port 3306.
2. Create a database named `petshop`.

### Configuration

1. Open the `application.properties` file in the `src/main/resources` directory.

2. Update the following properties with your MySQL database username and password:

   ```properties
   spring.datasource.username=your-username
   spring.datasource.password=your-password

## Running the Application

1. Open the project in your Java IDE.

2. Build and run the application. It will be accessible at [http://localhost:8080](http://localhost:8080).

### API Controllers

The PetShop Backend application includes several API controllers to manage users, pets, and perform test operations.

#### Available Endpoints

##### Auth Controller

- `/api/user` (POST): Register a new user.
- `/login` (POST): Sign in with your credentials.

##### Pets Controller

- `/api/pet` (POST): Get a pagination list of pets, in body send filter json object { hasOwner: true/false, name: "", type: null/DOG/CAT, price: null/number }.
- `/api/pet/{id}` (GET): Get details of a specific pet.
- `/api/pet/by-owner` (GET): Get a list of pets that auth user have.
- `/api/pet/create` (POST): Add a new pet to the store.
- `/api/pet/{id}` (PUT): Update pet details.
- `/api/pet/{id}` (DELETE): Delete a pet from the store.
- `/api/pet/{id}/buy` (POST): Auth user try to buy a pet.

##### Test Controller

The Test controller provides test endpoints for development and data generation.

- `/api/test/create-users` (GET): Create and store up to 10 users with random attributes.
- `/api/test/create-pets` (GET): Create and store up to 20 pets of different kinds (cats and dogs).
- `/api/test/list-users` (GET): Display data for all users in the store.
- `/api/test/list-pets` (GET): Display data for all pets in the store.
- `/api/test/buy` (GET): Attempt to buy a pet from the store for each user.

Enjoy using the PetShop Backend application! If you encounter any issues or have questions, feel free to reach out for assistance.
