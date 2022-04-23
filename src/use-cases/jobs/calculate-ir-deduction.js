module.exports = (value) => {
  if (value <= 1903.98) {
    return value * 0;
  } else if (value > 1903.98 && value <= 2826.65) {
    return value * 0.075;
  } else if (value > 2826.65 && value <= 3751.05) {
    return value * 0.15;
  } else if (value > 3751.05 && value <= 4664.68) {
    return value * 0.225;
  } else if (value > 4664.68) {
    return value * 0.275;
  }
};
