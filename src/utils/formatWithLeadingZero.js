export const formatWithLeadingZero = (number) => {
  return number < 10 ? `0${number}` : number.toString();
};
