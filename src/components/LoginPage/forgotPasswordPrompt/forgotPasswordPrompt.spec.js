// @ts-check
import { expect, test } from "@playwright/test";
import { setToLogOutState } from "../../../test/testUtils";

test.beforeEach(async ({ page }) => {
  page.goto("/login");
  await page.getByText("Forgot your password").click();
});

setToLogOutState();

test("clicking backdrop should close prompt", async ({ page }) => {
  const prompt = page.getByRole("dialog");

  await page.locator("#root").click({ position: { x: 5, y: 5 }, force: true });

  await expect(prompt).toBeHidden();
});

test("email field should show error if empty", async ({ page }) => {
  const error = page.getByText("is a required");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(error).toHaveCount(1);
});

test("email field should show error if email is invalid", async ({ page }) => {
  const error = page.getByText("must be a valid email");

  await page.getByLabel("email").fill("invalidEmai");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(error).toHaveCount(1);
});

test("Submission should display success notification", async ({ page }) => {
  const nofication = page.getByText("sent to your email");

  await page.getByLabel("email").fill("test@gmail.com");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(nofication).toBeVisible();
});
