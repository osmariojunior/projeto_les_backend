const yup = require("yup");
exports.default = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
});
