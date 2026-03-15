import {z} from 'zod'

export const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type LoginDTO = z.infer<typeof bodySchema>

export interface ILoginRepository{
    findByEmail(email: string): Promise<any>
}

export interface ILoginService{
    execute(data: LoginDTO): Promise<any>
}