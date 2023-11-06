import { test } from "@playwright/test";

export function setToLogOutState() {
  test.use({
    storageState: {
      cookies: [],
      localStorage: [],
    },
  });
}

export function generateJWT() {
  // The jwt token below if decoded contains
  // const user = {
  //   "_id": "650bc030bcfb2a12002587aa",
  //   "firstName": "Juan",
  //   "lastName": "Dela Cruz",
  // };
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBiYzAzMGJjZmIyYTEyMDAyNTg3YWEiLCJmaXJzdE5hbWUiOiJKdWFuIiwibGFzdE5hbWUiOiJEZWxhIENydXoiLCJpYXQiOjE2OTkyNjQ0MjJ9.pgePZ856nDJT6vBBCLRygb19zgHmChl6rESWKiXOG-s";
}
