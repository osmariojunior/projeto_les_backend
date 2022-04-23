const { hash, genSalt } = require("bcrypt");

exports.existsUseCase =
  (knex) =>
  async ({ id, email, nickname }) => {
    const existence = await knex("users")
      .where({
        email: email,
      })
      .orWhere({
        nickname: nickname,
      })
      .orWhere({
        id: id,
      });

    return existence && existence.length > 0;
  };
