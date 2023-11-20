import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../../app.js";

import "dotenv/config";

const uriDb = process.env.testuriDb;

describe("test", () => {
  beforeAll(
    async () => await mongoose.connect(uriDb, { dbName: "db-contacts" })
  );

  test("create a user", async () => {
    const res = await supertest(app)
      .post("/api/users/signup")
      .send({ email: "test@test.pl", password: "test111UserName" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);

    expect(res.body.user.email).toEqual("test@test.pl");
    expect(typeof res.body.user.email).toBe("string");
    expect(res.body.user).toHaveProperty("subscription", "starter");
    expect(typeof res.body.user.subscription).toBe("string");
  });
  test("login testuser user", async () => {
    const res = await supertest(app)
      .post("/api/users/login")
      .send({ email: "test@test.pl", password: "test111UserName" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);

    expect(res.body.user.email).toEqual("test@test.pl");
    expect(typeof res.body.user.email).toBe("string");
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });
  afterAll(async () => await mongoose.disconnect());
});
