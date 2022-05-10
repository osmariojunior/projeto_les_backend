const yup = require("yup");
module.exports = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  dollarSalary: yup.number().required(),
});
