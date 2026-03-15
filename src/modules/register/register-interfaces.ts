import {z} from 'zod'

export const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["CUSTOMER", "SELLER"]).optional(),
  company_cnpj: z.string().nullable().optional()
})

export type CreateUserDTO = z.infer<typeof bodySchema>

export interface IRegisterRepository{
    createUser(data: CreateUserDTO): Promise<any>
    userExists(email: string): Promise<any>
}

export interface IRegisterService{
    createUser(data: CreateUserDTO): Promise<any>
}