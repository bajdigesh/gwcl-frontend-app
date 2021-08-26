export const hasMorePage = (pagination: IPagination) => {
  if (pagination) {
    var totalPages = Math.floor((pagination?.total + +pagination?.per_page - 1) / pagination?.per_page);
    if (totalPages <= pagination?.current_page) {
      return false;
    } else {
      return true;
    }
  }

  return false;
};
