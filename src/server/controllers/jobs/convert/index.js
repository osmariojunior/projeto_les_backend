const requestSchema = require("./request-schema");
const apiFinance = require("../../../../services/hg-finance");
const calculateIRDeduction = require("../../../../use-cases/jobs/calculate-ir-deduction");
const calculateINSSDeduction = require("../../../../use-cases/jobs/calculate-inss-deduction");
const ValidationError = require("../../../../errors/validation-error");

const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const convert = async (req, res) => {
  const validity = await requestSchema.isValid(req.query);

  if (!validity) {
    throw new ValidationError("Bad Request.");
  }

  const dep = convert.dependencies();

  const dollarValue = await dep.apiFinance();
  const grossValue = dollarValue * req.body.dollarSalary;

  const inssDeduction = dep.calculateINSSDeduction(grossValue);
  const irDeduction = dep.calculateIRDeduction(grossValue - inssDeduction);

  res.send({
    name: req.body.name,
    description: req.body.description,
    dollar_salary: round(req.body.dollarSalary),
    dollar_value: round(dollarValue),
    converted_gross_salary: round(grossValue),
    ir_deduction_value: round(irDeduction),
    inss_deduction_value: round(inssDeduction),
    liquid_salary: round(grossValue - irDeduction - inssDeduction),
  });
};

convert.dependencies = () => ({
  apiFinance,
  calculateIRDeduction,
  calculateINSSDeduction,
});

module.exports = convert;
