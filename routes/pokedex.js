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

    const results = await Promise.allSettled(
      result.data.results.map(async (poke) => {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 250)
        );
        const detail = await axios.get(poke.url, { timeout: 2000 });
        // find what we need
        const { id, types, stats, sprites, weigth } = detail.data;

        const types1 = types.map((i) => i.type.name);
        poke.detail = {
          id,
          types: types1,
          stats: stats.map((s) => ({
            stat_base: s.base_stat,
            stat_name: s.stat.name,
          })),
          sprites,
          weigth,
        };
        const idString = poke.detail.id.toString().padStart(3, "0");
        poke.imageFull = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idString}.png`;
        poke.imageDetail = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idString}.png`;

        return poke;
      })
    );

    result.data.results = results.map((r) => ({
      status: r.status,
      reason: r.reason,
      ...r.value,
    }));

    result.data.hasRejected = result.data.results.find(
      (r) => r.reason !== null
    );
  } catch (error) {
    console.error(error);
  }

  return res.json(result.data);
});

router.get("/pokemon/:id", authCheck, async (req, res, next) => {
  const result = await axios.get(`/pokemon/${req.params.id}`);
  const { id, name, weigth, height, stats, sprites, types } = result.data;
  const poke = {
    id,
    name,
    detail: {
      id,
      name,
      weigth,
      height,
      stats: stats.map((s) => ({
        stat_base: s.base_stat,
        stat_name: s.stat.name,
      })),
      sprites,
      types,
    },
  };

  const types1 = types.map((i) => i.type.name);
  poke.detail.types = types1;
  const idString = poke.detail.id.toString().padStart(3, "0");
  poke.imageFull = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idString}.png`;
  poke.imageDetail = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idString}.png`;

  return res.json({ results: [poke] });
});

module.exports = router;
