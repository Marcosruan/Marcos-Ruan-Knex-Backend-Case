export type CreateUserDTO = {
    name: string
    email: string
    password: string
    role?: "CUSTOMER" | "SELLER"
    company_cnpj?: string | null
}

export interface ISigninRepository{
    createUser(data: CreateUserDTO): Promise<any>
}

export interface ISigninService{
    createUser(data: CreateUserDTO): Promise<any>
}