import { db } from "../../db/index.js";
import { companies } from "../../db/schema/companies-schema.js";
import type { ICompanyRepository, CompanyDTO } from "./companies-interfaces.js";

export class CompaniesRepository implements ICompanyRepository {
  constructor(private orm: typeof db) {}

  async addCompany(data: CompanyDTO) {
    const [company] = await this.orm.insert(companies).values(data).returning();
    return company!;
  }

  async companyExists(cnpj: string) {
    return await this.orm.query.companies.findFirst({
      where: (companies, { eq }) => eq(companies.cnpj, cnpj),
    });
  }
}
