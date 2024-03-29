export const getAreaName = (string) => {
  return string.slice(0, string.indexOf("(") - 1);
};
