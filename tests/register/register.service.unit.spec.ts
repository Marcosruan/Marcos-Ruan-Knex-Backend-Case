import { expect, it, describe, vi } from "vitest";
import { RegisterService } from "../../src/modules/register/register-service";
import { AppError } from "../../src/utils/app-error";

describe("RegisterService", () => {
  it("should return a strict user object and hash the password", async () => {
    const mockRepository = {
      userExists: vi.fn().mockResolvedValue(null),
      createUser: vi.fn().mockResolvedValue({
        id: "uuid-123",
        name: "John Doe",
        email: "john@example.com",
        password: "hashed_password",
      }),
    };

    const service = new RegisterService(mockRepository as any);

    const result = await service.execute({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      role: "CUSTOMER",
    });

    expect(result).toHaveProperty("id");
    expect(result).not.toHaveProperty("password");
    expect(result.email).toBe("john@example.com");
    expect(mockRepository.createUser).toHaveBeenCalled();
  });



  it("should throw an error if salesperson has no company_cnpj", async () => {
  const mockRepo = { userExists: vi.fn(), createUser: vi.fn() }
  const service = new RegisterService(mockRepo as any)

  const data = { 
    name: 'Vendedor', 
    email: 'venda@loja.com', 
    password: '123', 
    role: 'SALESPERSON', 
    company_cnpj: null
  }

  await expect(service.execute(data as any))
    .rejects
    .toThrow("Salespeople must belong to a company")
  });


  it("should throw an AppError (409) if user already exists", async () => {
    const mockRepo = {
      userExists: vi.fn().mockResolvedValue({ id: '1', email: 'existing@test.com' }),
      createUser: vi.fn()
    }

    const service = new RegisterService(mockRepo as any)

    const data = {
      name: 'New User',
      email: 'existing@test.com',
      password: '123'
    }

    await expect(service.execute(data as any))
      .rejects
      .toBeInstanceOf(AppError)
    
    try {
      await service.execute(data as any)
    } catch (err: any) {
      expect(err.statusCode).toBe(409)
      expect(err.message).toContain("The user may already exist")
    }
  });
});
