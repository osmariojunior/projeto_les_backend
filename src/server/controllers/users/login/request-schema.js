const yup = require("yup");

module.exports = yup.object().shape({
  body: yup.object().shape({
    password: yup.string().min(6).max(64).required(),
    nickname: yup.string().min(6).max(64).required(),
  }),
});
