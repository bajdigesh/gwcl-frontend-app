import { isEmptyObject } from './isEmptyObject';

/**
 * Check for empty object
 * @param {Object} value obj
 * @param {String} value fallBackText
 * @returns {HTMLElement}
 */
export const mapObjectValuesToHtmlElement = (obj: any, fallBackText: string) => {
  if (isEmptyObject(obj)) return <div>{fallBackText}</div>;

  return (
    <div>
      {Object.values(obj).map((errorValue: any) => (
        <div>{errorValue[0]}</div>
      ))}
    </div>
  );
};
