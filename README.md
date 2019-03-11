# Password Keeper API

### About:
API for the [Password Keeper](https://link) project.

It uses: 
  - Node.js
  - GraphQL
  - MongoDB

For the crytpograph on the protected fields, it uses the crypto package from Node.js with AES-256-CBC algorithm.

### Usage
You must fill the all the fields (except `SECRET_KET`) on the `.env.example` file and rename it to `.env`.

Then you must install the project with `npm install` and generate an key for your application with `npm run generate`. If you already have a key you can skip this step and paste your key on the `env` file.

To start the API run `npm start` if you wish to use it on production mode, or `npm run dev` for development mode.

GraphQL default endpoint: `/gpl`
