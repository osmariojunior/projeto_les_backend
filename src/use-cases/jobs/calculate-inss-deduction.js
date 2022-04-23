module.exports = (value) => {
  let total = 0;

  if (value > 3641.03) {
    total += (value <= 7087.22 ? value : 7087.22) * 0.14;
  }

  if (value > 2427.36) {
    total += (value <= 3641.03 ? value : 3641.03) * 0.12;
  }

  if (value > 1212.0) {
    total += (value <= 2427.36 ? value : 2427.36) * 0.09;
  }

  if (value <= 1212.0) {
    total += value * 0.075;
  }
  return total;
};
