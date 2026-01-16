const request = require("supertest");
const app = require("../server");

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "seed2@test.com",
      password: "password123"
    });
  token = res.body.token;
});

describe("Task CRUD", () => {
  it("creates task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Automated test task",
        priority: "HIGH",
        deadline: "2026-01-20"
      });

    expect(res.statusCode).toBe(201);
  });

  it("gets tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
