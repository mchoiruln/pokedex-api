const express = require("express");
const router = express.Router();
const { authCheck, auth } = require("../libs/firebase");

const axios = require("axios").create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 1000,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Pokedex" });
});

// auth register
router.post("/auth/register", async (req, res, next) => {
  try {
    const { email, password, displayName = null } = req.body;
    const data = await auth.createUser({ email, password, displayName });
    res.json({ data });
  } catch (error) {
    if (error.errorInfo) {
      return res.status(400).json(error.errorInfo);
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// end auth register

router.get("/protected", authCheck, function (req, res, next) {
  res.json({ title: "Your are authenticated user" });
});

// from https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

// api get one pokemon by pokedex id or name
// pokeapi doest expose detail of pokemon, so we try to get all information one by one

router.get("/pokemon", authCheck, async (req, res, next) => {
  const { limit, offset } = req.query;
  let result = {};
  try {
    result = await axios.get(`/pokemon?limit=${limit}&offset=${offset}`);

    // await asyncForEach(result.data.results, async (poke) => {
    //   const detail = await axios.get(poke.url);
    //   poke.len = result.data.results.length;
    //   poke.detail = detail.data;
    //   poke.imageFull = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idString}.png`;
    //   poke.imageDetail = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idString}.png`;
    //   return Promise.resolve(poke);
    // });

    const results = await Promise.all(
      result.data.results.map(async (poke) => {
        const detail = await axios.get(poke.url);
        poke.len = result.data.results.length;
        poke.detail = detail.data;
        const idString = poke.detail.id.toString().padStart(3, "0");
        poke.imageFull = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idString}.png`;
        poke.imageDetail = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idString}.png`;

        return poke;
      })
    );

    result.data.results = results;
  } catch (error) {
    console.error(error);
  }

  return res.json(result.data);
});

router.get("/pokemon/:id", authCheck, async (req, res, next) => {
  const id = parseInt(req.params.id);
  const result = await axios.get(`/pokemon/${id}`);

  const idString = req.params.id.padStart(3, "0");
  result.data.imageFull = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idString}.png`;
  result.data.imageDetail = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idString}.png`;
  return res.json(result.data);
});

module.exports = router;
