import type { CreateUserDTO, IRegisterService } from "./register-interfaces.js";
import { RegisterRepository } from "./register-repository.js";
import { AppError } from "../../utils/app-error.js";
import bcrypt from "bcrypt"

export class RegisterService implements IRegisterService {
  	constructor(private repository: RegisterRepository) {}

	async execute(data: CreateUserDTO) {
		const userExists = await this.repository.userExists(data.email);

		if (userExists) {
    		throw new AppError("Resource colision: The user may already exist", 409);
    	}

    	if (data.role === "SALESPERSON" && !data.company_cnpj){
			throw new AppError("Salespeople must belong to a company: Company might be wrong/missing.", 400);
    	}

    	const hashedPassword = await bcrypt.hash(data.password, 10);

    	const user = await this.repository.createUser({...data, password: hashedPassword});
		
    	return {id: user.id, name: user.name, email: user.email}
  	}
}
