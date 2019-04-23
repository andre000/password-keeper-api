# Password Keeper API
[![Build Status](https://travis-ci.org/andre000/password-keeper-api.svg?branch=master)](https://travis-ci.org/andre000/password-keeper-api)

### About:
API for the [Password Keeper](https://github.com/andre000/password-keeper) project.

It uses: 
  - Node.js
  - GraphQL
  - MongoDB
  - JWT
  - Jest

For the crytpograph on the protected fields, it uses the crypto package from Node.js with AES-256-CBC algorithm.

### Usage
You must fill the all the fields (except `SECRET_KET` and `SECRET_JWT`) on the `.env.example` file and rename it to `.env`.

Then you must install the project with `npm install` and generate an key for your application with `npm run generate`. If you already have a key you can skip this step and paste your key on the `env` file.

To start the API run `npm start` if you wish to use it on production mode, or `npm run dev` for development mode.

GraphQL default endpoint: `/gpl`

### First User

In order to create your first user, you must make a POST request to `/start` with a JSON having the fields: `name, email, password`.
This method is only avaiable when there is no user created. In order to create new ones, use the GraphQL endpoint.

### Authentication 

To generate the JWT token, make a POST request to `/login` with a JSON having the fields: `email, password`.
