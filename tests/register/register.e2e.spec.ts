import { it, describe, expect } from "vitest";
import { app } from "../../src/server";

describe("Register Controller (E2E)", () => {
  it("should return 201 when registering a valid user", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/register",
      payload: {
        name: "Controller Test",
        email: "controller@test.com",
        password: "password123",
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("id");
    expect(body).not.toHaveProperty("password");
  });



  it("should return 400 if email is invalid", async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        name: 'John Doe',
        email: 'email-invalido',
        password: '123'
      }
    })

    expect(response.statusCode).toBe(400)
    const body = JSON.parse(response.body)
    expect(body.message).toBeDefined()
  });



  it("should return 400 if required fields are missing", async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        email: 'test@example.com'
      }
    })

    expect(response.statusCode).toBe(400)
  });



  it("should return 400 if role is not allowed", async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/register',
      payload: {
        name: 'John',
        email: 'john@test.com',
        password: '123',
        role: 'SUPER_HERO'
      }
    })

    expect(response.statusCode).toBe(400)
  });
});
