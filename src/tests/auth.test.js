const request = require("supertest");
const app = require("../server");


let token;

describe("Auth flow", () => {
  it("logs in seeded user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "seed1@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });
});

module.exports = { token };
