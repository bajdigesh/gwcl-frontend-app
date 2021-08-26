/**
 * Encrypt id to base64 value
 *
 * @param text - any string
 * @returns {String}
 */
export const encrypt = (text: string) => {
  return encodeURIComponent(btoa(btoa(text)));
};

/**
 * Decrypt base64 value
 *
 * @param  text - any string
 * @returns {unknown}
 */
export const decrypt = (encryptedText: string) => {
  return atob(atob(decodeURIComponent(encryptedText)));
};
