import { db } from "../../db/index.js";
import { users } from "../../db/schema/users-schema.js";
import type { IRegisterRepository, CreateUserDTO } from "./register-interfaces.js";

export class RegisterRepository implements IRegisterRepository {
  constructor(private orm: typeof db) {}

  async createUser(data: CreateUserDTO) {
    const [user] = await this.orm.insert(users).values(data).returning();
    return user!;
  }

  async userExists(email: string) {
    return await this.orm.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email)});
  }
}
