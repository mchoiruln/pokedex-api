# Pokemon API

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

## Deployment

- [Pokedex UI](https://pokedex-ui-nuxt.netlify.app)
- [Pokedex API](https://pokedex-api-express.herokuapp.com/)