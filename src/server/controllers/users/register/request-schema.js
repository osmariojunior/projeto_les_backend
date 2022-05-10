const yup = require("yup");

module.exports = yup.object().shape({
  firstName: yup.string().max(255).required(),
  lastName: yup.string().max(255).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().min(6).max(64).required(),
  nickname: yup.string().min(6).max(64).required(),
});
