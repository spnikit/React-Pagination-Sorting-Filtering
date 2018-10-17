import _ from "lodash";

export function paginate(array, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;

  return _(array)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
