// @ts-check
import { expect, test } from "@playwright/test";
import { generateJWT, setToLogOutState } from "../../test/testUtils";

let logoutLink, submitBttn;

test.beforeEach(async ({ page }) => {
  logoutLink = page.getByRole("link", { name: "Log-out" });
  submitBttn = page.getByRole("button", { name: "Submit" });

  await page.route(`/api/auth/login`, async (route) => {
    await route.fulfill({
      json: generateJWT(),
    });
  });
  await page.route(`/api/user/signup/email`, async (route) => {
    await route.fulfill({
      json: "Email is available.",
    });
  });
  await page.route(`/api/user/signup`, async (route) => {
    await route.fulfill({
      headers: {
        authorization: generateJWT(),
      },
      json: {
        _id: "1",
        firstName: "firstName",
        lastName: "lastName",
      },
    });
  });
  await page.goto("/signup");
});

setToLogOutState();

test("Errors should appear if inputs are invalid", async ({ page }) => {
  const errors = page
    .getByText("is a required")
    .or(page.getByText("must be a valid email"))
    .or(page.getByText("must be at least 5 characters"));

  await submitBttn.click();

  await expect(errors).toHaveCount(6);
});

test("Submit button should login new user", async ({ page }) => {
  await page.getByPlaceholder("First Name").fill("firstName");
  await page.getByPlaceholder("Last Name").fill("lastName");
  await page.getByPlaceholder("Mobile No.").fill("+639757346229");
  await page
    .getByPlaceholder("Email", { exact: true })
    .fill("firstName@gmail.com");
  await page.getByPlaceholder("Password", { exact: true }).fill("password");
  await page.getByPlaceholder("Confirm Password").fill("password");
  await submitBttn.click();

  await expect(logoutLink).toBeVisible();
});

test("Demo login button should login demo account", async ({ page }) => {
  await page.getByRole("button", { name: "Demo login" }).click();

  await expect(logoutLink).toBeVisible();
});
