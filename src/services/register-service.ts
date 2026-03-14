import type {
  CreateUserDTO,
  ISigninService,
} from "../interfaces/signin-interfaces.js";
import { SigninRepository } from "../repositories/register-repository.js";

export class SigninService implements ISigninService {
  constructor(private repository: SigninRepository) {}

  async createUser(data: CreateUserDTO) {
    const result = await this.repository.createUser(data);
    return result;
  }
}
