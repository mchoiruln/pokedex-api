const mcache = require("memory-cache");

module.exports = function (duration) {
  return (req, res, next) => {
    // use url as key
    const key = "__express__" + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      // return cache response
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000); // duration is in milliseconds
        res.sendResponse(body);
      };
      next();
    }
  };
};
