function paginate(currentPage, itemsCount, maxItemsPerPage, noOfPageVisible) {
  if (!isInclusivelyWithinRange(itemsCount, Infinity, 0))
    throw Error(`'itemsCount' must be a whole number.`);

  if (!isInclusivelyWithinRange(maxItemsPerPage, Infinity, 1))
    throw Error(`'maxItermPerPage' must be a counting number.`);

  const pageNoLowerLimit = 1;
  const totalPages = Math.ceil(itemsCount / maxItemsPerPage);

  if (!isInclusivelyWithinRange(currentPage, totalPages, pageNoLowerLimit))
    throw Error("'currentPage' is out of bounds.'");

  //prevent noOfPageVisible from going out of bounds
  noOfPageVisible = clamp(noOfPageVisible, totalPages, pageNoLowerLimit);

  let pageNums = [];
  let rightCounter = currentPage + 1;
  let leftCounter = currentPage;

  while (
    !(pageNums.length === noOfPageVisible) ||
    !(pageNums.length === totalPages)
  ) {
    if (rightCounter <= totalPages) pageNums.push(rightCounter++);
    if (leftCounter >= pageNoLowerLimit) pageNums.unshift(leftCounter--);
  }

  return pageNums;
}

export function clamp(entry, max, min) {
  for (let argument of arguments)
    if (!Number.isInteger(argument))
      throw Error("Arguments must be an integer.");

  return Math.max(min, Math.min(entry, max));
}

function isInclusivelyWithinRange(entry, max, min) {
  return entry <= max && entry >= min;
}

export default paginate;
