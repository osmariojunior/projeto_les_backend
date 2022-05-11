const { hash } = require("bcrypt");
const { existsUseCase } = require("../../../src/use-cases/users/exists");

describe("Use Case - Exists", () => {
  it("should return true", async () => {
    const knex = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([
        {
          id: 1,
          first_name: "John",
          last_name: "Lennon",
          nickname: "john_leninho",
          password_hash: await hash("password", 8),
        },
      ]),
    });

    const result = await existsUseCase(knex)({
      id: 1,
    });

    expect(result).toBeTruthy();

    expect(knex).toBeCalledWith("users");
    expect(knex().where).toBeCalledWith({
      id: 1,
    });
  });

  it("should return true for email found", async () => {
    const knex = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([
        {
          id: 1,
          first_name: "John",
          last_name: "Lennon",
          nickname: "john_leninho",
          password_hash: await hash("password", 8),
        },
      ]),
    });

    const result = await existsUseCase(knex)({
      email: "@email.com",
    });

    expect(result).toBeTruthy();

    expect(knex).toBeCalledWith("users");
    expect(knex().where).toBeCalledWith({
      email: "@email.com",
    });
  });

  it("should return true for nickname found", async () => {
    const knex = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([
        {
          id: 1,
          first_name: "John",
          last_name: "Lennon",
          nickname: "john_leninho",
          password_hash: await hash("password", 8),
        },
      ]),
    });

    const result = await existsUseCase(knex)({
      nickname: "john_leninho",
    });

    expect(result).toBeTruthy();

    expect(knex).toBeCalledWith("users");
    expect(knex().where).toBeCalledWith({
      nickname: "john_leninho",
    });
  });

  it("should return false for user not found", async () => {
    const knex = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([]),
    });

    const result = await existsUseCase(knex)({
      id: 1,
    });

    expect(result).toBeFalsy();

    expect(knex).toBeCalledWith("users");
    expect(knex().where).toBeCalledWith({
      id: 1,
    });
  });
});
