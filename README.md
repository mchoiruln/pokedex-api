# Pokemon API

[![Build Status](https://app.travis-ci.com/mchoiruln/pokedex-api.svg?branch=main)](https://app.travis-ci.com/mchoiruln/pokedex-api)

This project is serving a pokemon api for Frontend App, Data pokemon
is coming from PokeAPI services.

## Environment

Check .env.example about environment configuration for web app needed  

```ini
# .env file at root project
# json of service account key, oneline json minify
GOOGLE_APPLICATION_CREDENTIALS=
```

## Development

```bash
$ npm install
# serve with hot reload at localhost:3001
$ npm run dev
```

## Test
```bash
$ npm run test

# Example
GET /api 200 4.981 ms - 19
 PASS  test/index.spec.js
  API Endpoints
    √ GET /api should show message api pokedex (50 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.004 s
Ran all test suites.
```

## Production

```bash
$ npm install
$ npm run start
```
## 3rd party library

What 3rd party library we used :

- Cors
  > To allow access when domain is different
- Axios
  > To consume poke api
- Firebase Admin SDK
  > To create user and validation token using google technology
- Dotenv
  > To load .env file to process.env
- nodemon
  > Hot reload when development
- memory-cache
  > To create cache for response in short lifetime

### Test 3rd Party library

- [Jest](https://www.npmjs.com/package/jest)
- [Supertest](https://www.npmjs.com/package/supertest)
- [jest-node-exports-resolver](https://www.npmjs.com/package/jest-node-exports-resolver)
  > To resolve `Cannot find module 'firebase-admin/app' from 'libs/firebase.js'`
    when run testing

## Deployment

- [Pokedex UI](https://pokedex-ui-nuxt.netlify.app)
- [Pokedex API](https://pokedex-api-express.herokuapp.com/)

