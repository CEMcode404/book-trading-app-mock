function paginate(pageShown, itemCount, currentPage, maxItems) {
  for (let i = 0; i < arguments.length; i++) {
    //all argument should be int
    if (!Number.isInteger(arguments[i])) return false;

    //all argument should be more than 0
    if (arguments[i] < 1) return false;
  }

  const pageNo = Math.ceil(itemCount / maxItems);

  if (pageShown === 1 || pageNo === 1) return [1];

  if (currentPage > pageNo) return false;

  //adjust pageShown to available page no.
  if (pageShown > pageNo) {
    pageShown = pageNo;
  }

  const middleNo = Math.ceil(pageShown / 2);

  let right;
  let left;

  const requiredRight = pageShown - middleNo;

  if (currentPage + requiredRight <= pageNo) {
    right = requiredRight;
  } else {
    const availableRight =
      requiredRight - (currentPage + requiredRight - pageNo);
    right = availableRight;
  }

  const requiredLeft = middleNo;

  if (currentPage - requiredLeft > 0) {
    left = requiredLeft;
  } else {
    const availableLeft = requiredLeft + (currentPage - requiredLeft);
    left = availableLeft;
  }

  //negative means that it is the space needed
  const missingLeft =
    currentPage - requiredLeft < 0 ? Math.abs(currentPage - requiredLeft) : 0;

  const missingRight =
    pageNo - (currentPage + requiredRight) < 0
      ? Math.abs(pageNo - (currentPage + requiredRight))
      : 0;

  if (missingLeft) {
    right = right + missingLeft;
  }

  if (missingRight) {
    left = left + missingRight;
  }

  left = Array.from(
    Array(left).keys(),
    (number) => currentPage - left + number + 1
  );

  right = Array.from(Array(right).keys(), (number) => currentPage + number + 1);

  return [...left, ...right];
}

export default paginate;
