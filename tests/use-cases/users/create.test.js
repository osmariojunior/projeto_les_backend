const { createUseCase } = require("../../../src/use-cases/users/create");

describe("Use Case - Create User", () => {
  it("", async () => {
    const knex = jest.fn().mockReturnValue({
      insert: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue({
          email: "paul_mcartney@email.com",
          first_name: "Paul",
          last_name: "Mcartney",
          nickname: "paul_anka_copy",
          password_hash: "password_hash",
          created_at: new Date(),
          updated_at: new Date(),
        }),
      }),
    });

    const result = await createUseCase(knex)({
      email: "paul_mcartney@email.com",
      firstName: "Paul",
      lastName: "Mcartney",
      nickname: "paul_anka_copy",
      password: "not_hashed_password",
    });

    expect(result).toEqual({
      email: "paul_mcartney@email.com",
      first_name: "Paul",
      last_name: "Mcartney",
      nickname: "paul_anka_copy",
      password_hash: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });

    expect(knex).toBeCalledWith("users");
    expect(knex().insert).toBeCalledWith({
      email: "paul_mcartney@email.com",
      first_name: "Paul",
      last_name: "Mcartney",
      nickname: "paul_anka_copy",
      password_hash: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    expect(knex().insert().returning).toBeCalledWith("*");
  });
});
