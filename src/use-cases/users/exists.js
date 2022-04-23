const { hash, genSalt } = require("bcrypt");

exports.existsUseCase =
  (knex) =>
  async ({ id, email, nickname }) => {
    const existence = await knex("users").where({
      ...(id ? { id: id } : {}),
      ...(email ? { email: email } : {}),
      ...(nickname ? { nickname: nickname } : {}),
    });

    return existence && existence.length > 0;
  };
