/**
 * Encode query params from key value pair
 * @example
 * getMiddleString('rr@test#re', &, #)
 * => test
 *
 * @param string the string that the function acts upon
 * @param startChar the start character from where extraction should begin
 * @param endChar the end character from where extraction should end
 * @returns {string}
 */

export function extractMiddleString(string: string, startChar: any, endChar: any) {
  return string.substring(string.lastIndexOf(startChar) + 1, string.lastIndexOf(endChar));
}
