import { z } from "zod";
import type { UserResponse } from "../../@types/responses";

export const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().max(255),
});

export type LoginDTO = z.infer<typeof bodySchema>;

export interface ILoginRepository {
  findByEmail(email: string): Promise<UserResponse | undefined>;
}

export interface ILoginService {
  execute(data: LoginDTO): Promise<UserResponse>;
}
