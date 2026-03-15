import { z } from "zod";
import type { UserResponse } from "../../@types/responses";

export const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["CUSTOMER", "SALESPERSON", "ADMIN"]).optional(),
  company_cnpj: z.string().nullable().optional(),
});

export type CreateUserDTO = z.infer<typeof bodySchema>;
export interface StrictUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface IRegisterRepository {
  createUser(data: CreateUserDTO): Promise<UserResponse>;
  userExists(email: string): Promise<UserResponse | undefined>;
}

export interface IRegisterService {
  execute(data: CreateUserDTO): Promise<StrictUserResponse>;
}
