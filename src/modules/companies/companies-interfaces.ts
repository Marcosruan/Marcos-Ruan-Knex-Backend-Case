import { z } from "zod";
import type { CompanyResponse } from "../../@types/responses";

export const bodySchema = z.object({
  name: z.string(),
  cnpj: z.string().length(14),
});

export type CompanyDTO = z.infer<typeof bodySchema>;

export interface ICompanyRepository {
  companyExists(cnpj: string): Promise<CompanyResponse | undefined>;
}

export interface ICompanyService {
  execute(data: CompanyDTO): Promise<CompanyResponse>;
}
