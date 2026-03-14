import { LoginRepository } from "../repositories/login-repository.js";

export class LoginService {
    constructor(private repository: LoginRepository){}

    async createLogin(){
        const result = await this.repository.createLogin();
        return result;
    }
}