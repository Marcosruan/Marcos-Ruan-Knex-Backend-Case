import { db } from "../../db/index.js";
export class LoginRepository {
  constructor(private orm: typeof db) {}

  async findByEmail(email: string) {
    const user = await this.orm.query.users.findFirst({where: (users, { eq }) => eq(users.email, email)});
    return user;
  }
}
