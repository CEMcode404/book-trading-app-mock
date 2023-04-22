//there are two pages who are not allowed to not have navbar at the moment
//of writing this code so I put the list here instead of a separate a json file.

const notAllowedPaths = ["/index", "/"];

function isNavbarAllowed(urlPath) {
  for (let i = 0; i < notAllowedPaths.length; i++) {
    if (notAllowedPaths[i] === urlPath) return true;
  }
  return false;
}

export default isNavbarAllowed;
