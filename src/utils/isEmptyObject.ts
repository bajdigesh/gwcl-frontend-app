/**
 * Check for empty object
 * @param {Object} value Object
 * @returns {Boolean}
 */

export function isEmptyObject(value: { [key: string]: any }) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}
