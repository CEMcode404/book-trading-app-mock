export default function checkFormErrors(errObject) {
  const isTrue = Object.values(errObject).length;
  return isTrue;
}
