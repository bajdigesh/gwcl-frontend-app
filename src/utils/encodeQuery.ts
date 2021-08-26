/**
 * Encode query params from key value pair
 * @example
 * encodeQuery({active: false})
 * => active=false
 *
 * @param  data - Query Key value pair Object
 * @returns {string}
 */

type QueryData = {
  [key: string]: any;
};

export function encodeQuery(data: QueryData) {
  let query = '';
  for (let d in data) query += encodeURIComponent(d) + '=' + encodeURIComponent(data[d] || '') + '&';
  return query.slice(0, -1);
}
