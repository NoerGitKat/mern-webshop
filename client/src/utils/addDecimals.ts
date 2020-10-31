const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export default addDecimals;
