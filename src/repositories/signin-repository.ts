import { db } from "../db/index.js";
import { users } from "../db/schema/users-schema.js";
import type { ISigninRepository, CreateUserDTO } from "../interfaces/signin-interfaces.js";

export class SigninRepository implements ISigninRepository {
  constructor(private orm: typeof db) {}

  async createUser(data: CreateUserDTO) {
    const user = await this.orm.insert(users).values(data).returning()
    return user;
  }
}
