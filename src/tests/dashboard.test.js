const request = require("supertest");
const app = require("../server");


let adminToken;
let userToken;

beforeAll(async () => {
  const admin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "seed1@test.com", // ADMIN
      password: "password123"
    });

  const user = await request(app)
    .post("/api/auth/login")
    .send({
      email: "seed3@test.com",
      password: "password123"
    });

  adminToken = admin.body.token;
  userToken = user.body.token;
});

describe("Dashboard RBAC", () => {
  it("blocks user access", async () => {
    const res = await request(app)
      .get("/api/dashboard/overview")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it("allows admin access", async () => {
    const res = await request(app)
      .get("/api/dashboard/overview")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});
