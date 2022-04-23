const axios = require("axios");
const HG_FINANCE_KEY = process.env.HG_FINANCE_KEY;
const HG_FINANCE_API_URL = process.env.HG_FINANCE_API_URL;

const cache = {};

const queryUSDValue = async () => {
  const dep = queryUSDValue.dependencies();
  if (new Date() <= dep.cache.expire_at) {
    return dep.cache.value;
  }

  const { data } = await axios.get(
    `${HG_FINANCE_API_URL}?key=${HG_FINANCE_KEY}`
  );
  dep.cache.value = data?.results?.currencies.USD.sell;
  dep.cache.expire_at = new Date().setTime(new Date().getTime() + 15 * 60000);
  return data?.results.currencies.USD.sell;
};

queryUSDValue.dependencies = () => ({
  cache,
});

module.exports = queryUSDValue;
