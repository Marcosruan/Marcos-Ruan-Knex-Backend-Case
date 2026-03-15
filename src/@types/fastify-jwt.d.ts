import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      role: string
      company_cnpj: string
    }
    user: {
      sub: string
      role: string
      company_cnpj: string
    }
  }
}