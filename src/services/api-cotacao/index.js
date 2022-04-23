const https = require("https");
const HG_FINANCE_KEY = process.env.HG_FINANCE_KEY;
const HG_FINANCE_API_URL = process.env.HG_FINANCE_API_URL;

const queryUSDValue = async () => {
  const { results } = await https.get(
    `${HG_FINANCE_API_URL}?key=${HG_FINANCE_KEY}&currencies=USD`
  );

  return results.USD.sell;
};

module.exports = queryUSDValue;
