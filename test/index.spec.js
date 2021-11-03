const server = require("../app");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("API Endpoints", () => {
  it("GET /api should show message api pokedex", async () => {
    const res = await requestWithSupertest.get("/api");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("title");
  });
});
