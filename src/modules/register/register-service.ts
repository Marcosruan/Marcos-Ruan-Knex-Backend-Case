import type { CreateUserDTO, IRegisterService } from "./register-interfaces.js";
import { RegisterRepository } from "./register-repository.js";
import { AppError } from "../../utils/app-error.js";

export class RegisterService implements IRegisterService {
  constructor(private repository: RegisterRepository) {}

  async createUser(data: CreateUserDTO) {
    const user = await this.repository.userExists(data.email);

    if (user) {
      throw new AppError("Resource colision. The user may already exist", 409);
    }
    const result = await this.repository.createUser(data);
    return result;
  }
}
