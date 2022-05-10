const yup = require("yup");
module.exports = yup.object().shape({
  query: yup.object().shape({
    jobName: yup.string(),
    companyName: yup.string(),
    minSalary: yup.number().min(0),
    maxSalary: yup.number(),
  }),
});
