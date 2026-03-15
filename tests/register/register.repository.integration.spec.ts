import { it, describe, expect } from 'vitest'
import { RegisterRepository } from '../../src/modules/register/register-repository'
import { db } from '../../src/db'

describe("RegisterRepository Integration", () => {
  const repository = new RegisterRepository(db);

  it("should insert a user in the database", async () => {
    const userData = { name: 'Test', email: 'test@db.com', password: '123' };
    const user = await repository.createUser(userData);

    expect(user).toHaveProperty('id');
  });
})