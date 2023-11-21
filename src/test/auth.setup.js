import { test as setup, expect } from "@playwright/test";
import { generateJWT } from "./testUtils";

const authFile = "./src/test/auth.json";

setup("authenticate", async ({ page }) => {
  await page.route(`/api/auth/login`, async (route) => {
    await route.fulfill({
      json: generateJWT(),
    });
  });
  await page.goto("/login");
  await page
    .getByPlaceholder("Email", { exact: true })
    .fill("username@gmail.com");
  await page.getByPlaceholder("Password").fill("password");
  await page.getByRole("button", { name: "Log in" }).click();

  await page.context().storageState({ path: authFile });
});
