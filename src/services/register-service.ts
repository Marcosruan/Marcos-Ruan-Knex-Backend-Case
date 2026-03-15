import type { CreateUserDTO, ISigninService } from "../interfaces/signin-interfaces.js";
import { SigninRepository } from "../repositories/register-repository.js";
import { AppError } from "../utils/app-error.js";

export class SigninService implements ISigninService {
  constructor(private repository: SigninRepository) {}

  async createUser(data: CreateUserDTO) {
    const user = await this.repository.userExists(data.email);

    if (user){
      throw new AppError("Resource colision. The user may already exist", 409);
    }
    const result = await this.repository.createUser(data);
    return result;
  }
}
