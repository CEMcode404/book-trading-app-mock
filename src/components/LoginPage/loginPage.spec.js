// @ts-check
import { expect, test } from "@playwright/test";
import { generateJWT, setToLogOutState } from "../../test/testUtils";

test.beforeEach(async ({ page }) => {
  page.goto("/login");
  await page.route(`/api/auth/login`, async (route) => {
    await route.fulfill({
      json: generateJWT(),
    });
  });
});

setToLogOutState();

test.describe("Login Butons", () => {
  let logoutLink;
  test.beforeEach(async ({ page }) => {
    logoutLink = page.getByRole("link", { name: "Log-out" });
  });

  test("'Log in' button should login user", async ({ page }) => {
    await page
      .getByPlaceholder("Email", { exact: true })
      .fill("username@gmail.com");
    await page.getByPlaceholder("Password").fill("password");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(logoutLink).toBeVisible();
  });

  test("'Demo login' button should login the demo account", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Demo login" }).click();

    await expect(logoutLink).toBeVisible();
  });
});

test.describe("Errors messages", () => {
  let loginButton;
  test.beforeEach(async ({ page }) => {
    loginButton = page.getByRole("button", { name: "Log in" });
  });

  test("Error should show if email is empty", async ({ page }) => {
    const error = page.getByText("is a required");

    await loginButton.click();

    await expect(error).toHaveCount(1);
  });

  test("Error should show if password is empty", async ({ page }) => {
    const error = page.getByText("must be at least 5 characters");

    await loginButton.click();

    await expect(error).toHaveCount(1);
  });

  test("Error should show if email is invalid", async ({ page }) => {
    const error = page.getByText("must be a valid email");

    await page.getByPlaceholder("Email", { exact: true }).fill("invalidEmail");
    await loginButton.click();

    await expect(error).toHaveCount(1);
  });
});

test.describe("Links", () => {
  test("'Not Sign up Yet' link should navigate to sign up page", async ({
    page,
  }) => {
    await page.getByText("Not Sign up Yet").click();

    expect(page.url()).toContain("/signup");
  });

  test("'Forgot your password' should open a prompt", async ({ page }) => {
    const prompt = page.getByRole("dialog");

    await page.getByText("Forgot your password").click();

    await expect(prompt).toBeVisible();
  });
});
