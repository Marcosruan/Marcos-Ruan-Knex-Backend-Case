import type { CompanyDTO, ICompanyService } from "./companies-interfaces";
import { CompaniesRepository } from "./companies-repository";
import { AppError } from "../../utils/app-error.js";

export class CompaniesService implements ICompanyService {
  constructor(private repository: CompaniesRepository) {}

  async execute(data: CompanyDTO) {
    const companyExists = await this.repository.companyExists(data.cnpj);

    if (companyExists) {
      throw new AppError(
        "Resource colision: The company may already exist", 409);
    }

    const company = await this.repository.addCompany(data);

    return company;
  }
}
