const yup = require("yup");

module.exports = yup.object().shape({
  companyId: yup.number().required(),
});
