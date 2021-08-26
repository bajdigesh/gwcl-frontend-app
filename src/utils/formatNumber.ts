/**
 * Check for empty object
 * @param {Number} number
 * @returns {String}
 */
export const formatNumberInDollar = (number: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
};
