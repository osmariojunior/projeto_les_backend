const yup = require("yup");
module.exports = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
});
