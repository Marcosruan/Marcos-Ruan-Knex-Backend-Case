import { AppError } from "../../utils/app-error.js";
import { LoginRepository } from "./login-repository.js";
import type { ILoginService, LoginDTO } from "./login-interfaces.js";
import bcrypt from 'bcrypt'

export class LoginService implements ILoginService{
  	constructor(private repository: LoginRepository) {}

  	async execute(data: LoginDTO) {
    	const user = await this.repository.findByEmail(data.email);

    	if (!user) {
    	  throw new AppError("Resource not found. The user may not exist or credentials are wrong/missing.", 401);
   		}

    	const passwordMatch = await bcrypt.compare(data.password, user.password);

    	if (!passwordMatch) {
      	throw new AppError("Autentication error: Credentials might be wrong/missing", 401);
    	}

		return user!;
  }
}
