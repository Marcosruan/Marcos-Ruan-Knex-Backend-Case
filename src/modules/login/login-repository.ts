import { db } from "../../db/index.js";

export class LoginRepository {
  constructor(private orm: typeof db) {}

  async createLogin() {
    return { ok: true };
  }
}
