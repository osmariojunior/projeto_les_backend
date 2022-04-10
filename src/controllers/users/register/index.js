const { createUseCase } = require("../../use-cases/users/create");
const knex = require("../../../infra/database/index");
const requestSchema = require("./request-schema");

exports.register = async (req, res) => {
  const validity = await requestSchema.isValid(req.body);

  if (!validity) {
    res.status(400).send();
    return;
  }

  try {
    const user = await createUseCase(knex)(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send();
    throw err;
  }
};
