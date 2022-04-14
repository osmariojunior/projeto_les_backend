const { compare } = require("bcrypt");
exports.loginUseCase =
  (knex) =>
  async ({ nickname, password }) => {
    const [user] = await knex("users").where({
      nickname,
    });

    if (!user) {
      return false;
    }

    const verified = await compare(password, user.password_hash);
    if (verified) {
      delete user.password_hash;
      return user;
    }
    return false;
  };
