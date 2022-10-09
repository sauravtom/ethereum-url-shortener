export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
