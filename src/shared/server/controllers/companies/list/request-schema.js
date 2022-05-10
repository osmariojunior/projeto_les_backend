const yup = require("yup");

module.exports = yup.object().shape({
  name_filter: yup.string(),
  limit: yup.number().default(25),
  offset: yup.number().default(0),
});
