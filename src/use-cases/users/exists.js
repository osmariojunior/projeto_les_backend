const { hash, genSalt } = require("bcrypt");

exports.existsUseCase =
  (knex) =>
  async ({ email, nickname }) => {
    const existence = await knex("users")
      .where({
        email: email,
      })
      .orWhere({
        nickname: nickname,
      });

    if (existence && existence.length > 0) {
      return true;
    }
    return false;
  };
