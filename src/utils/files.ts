/**
 *
 * @param theBlob The file object
 * @param fileName File name
 * @returns {Blob}
 */
export function blobToFile(theBlob: any, fileName: string) {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;

  return theBlob;
}

/**
 * @param extension file extension name
 * @returns {string} file types
 */
export function mimeType(extension: string) {
  switch (extension) {
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    case 'xls':
      return 'application/vnd.ms-excel';

    default:
      return 'text/csv';
  }
}
