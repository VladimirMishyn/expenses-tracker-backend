# Backend application for Expenses Tracker

## Development server

Run `npm run dev` for a dev server. The app will automatically reload if you change any of the source files in `./src` directory.

Application requires running instance of MongoDB running localy on port 27017. Dockering soon will be implemented

## Accessing with Postman

Import `misc\Expenses tracker.postman_collection.json` into your standalone Postman application ( ver 8+ preffered) and set Environment variables
![alt text](./docs/images/env-varaibles-potman.png)

Every call to login or user creation will set Auth token automaticaly in Postman for future requests
