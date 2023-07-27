export const separator = (numb) => {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};

export const getRandomArbitrary = (min, max) => {
  return JSON.stringify(Math.round(Math.random() * (max - min) + min));
};
