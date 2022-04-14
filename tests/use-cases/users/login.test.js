const { hash } = require("bcrypt");
const { loginUseCase } = require("../../../src/use-cases/users/login");

describe("Use Case - login", () => {
  it("should match nickname and password", async () => {
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

    const result = await loginUseCase(knex)({
      nickname: "john_leninho",
      password: "password",
    });

    expect(result).toEqual({
      id: 1,
      first_name: "John",
      last_name: "Lennon",
      nickname: "john_leninho",
    });

    expect(knex).toBeCalledWith("users");
    expect(knex().where).toBeCalledWith({
      nickname: "john_leninho",
    });
  });

  it("should return false for user not found", async () => {
    const knex = jest.fn().mockReturnValue({
      where: jest.fn().mockResolvedValue([]),
    });

    const result = await loginUseCase(knex)({
      nickname: "john_leninho",
      password: "password",
    });

    expect(result).toBeFalsy();

    expect(knex).toBeCalledWith("users");
    expect(knex().where).toBeCalledWith({
      nickname: "john_leninho",
    });
  });

  it("should return false for password not matching", async () => {
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

    const result = await loginUseCase(knex)({
      nickname: "john_leninho",
      password: "not_matching_password",
    });

    expect(result).toBeFalsy();

    expect(knex).toBeCalledWith("users");
    expect(knex().where).toBeCalledWith({
      nickname: "john_leninho",
    });
  });
});
