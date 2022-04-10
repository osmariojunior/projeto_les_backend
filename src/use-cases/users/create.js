const { hash, genSalt } = require("bcrypt");

const SALT_ROUNDS = 8;

exports.createUseCase =
  (knex) =>
  async ({ email, firstName, lastName, nickname, password }) => {
    const salt = await genSalt(SALT_ROUNDS);
    const password_hash = await hash(password, salt);

    return knex("users").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      nickname: nickname,
      password_hash: password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    });
  };
