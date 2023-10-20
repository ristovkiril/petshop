# PetShop Application

Welcome to the PetShop application, where you can manage and adopt pets.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Using Docker](#using-docker)
    - [Manual Setup](#manual-setup)
- [Accessing the Application](#accessing-the-application)
- [Questions or Issues](#questions-or-issues)

## Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Docker (for using Docker) - [Docker Installation Guide](https://docs.docker.com/get-docker/)
- Node.js and npm (for manual setup) - [Node.js Download Page](https://nodejs.org/)

## Getting Started

You have two options to start the PetShop application: using Docker or manually setting up the backend and frontend.

### Using Docker

1. **Build Backend Image**:

   Navigate to the `petshop-backend` directory and run the following command to build the backend Docker image:

   ```bash
   cd petshop-backend
   docker build -t petshop-backend:latest .

2. **Build Frontend Image**:

    Navigate to the `petshop-frontend` directory and run the following command to build the frontend Docker image:
    
    ```bash
    cd petshop-frontend
    docker build -t frontend-app:latest .

3. **Run both services**:

    ```docker-compose up```

4. **Accessing the Application**:

    <a href="http://localhost:3030" target="_blank">http://localhost:3030</a>

### Manual Setup
If you prefer not to use Docker, you can manually set up the backend and frontend applications.
In each project there is a readme file.


