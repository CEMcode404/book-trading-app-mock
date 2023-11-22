// @ts-check
import { expect, test } from "@playwright/test";
import { setToLogOutState } from "../../../test/testUtils";
import user from "./../../../mockDatas/user.json";

test.beforeEach(async ({ page }) => {
  page.goto("/");
  await page.getByAltText("Menu Icon").click();
});

test.use({
  viewport: { width: 479, height: 900 },
});

test("close on backdrop click", async ({ page }) => {
  await page.locator("#root").click({ position: { x: 5, y: 5 }, force: true });

  await expect(
    page.getByRole("dialog").getByLabel("Pop up Navigation")
  ).toBeHidden();
});

test.describe("navigation", () => {
  test.describe("logged out", () => {
    setToLogOutState();

    shouldNavigateTo("/", "HOME");
    shouldNavigateTo("/login", "LOG IN");
    shouldNavigateTo("/signup", "SIGNUP");
  });

  test.describe("logged in", () => {
    test("'Log-out' to log out and navigate to /", async ({ page }) => {
      await page.getByText("LOG OUT").click();

      expect(page.url()).toContain("/");
    });

    test("'JUAN' navigate to /account", async ({ page }) => {
      await page.route(`/api/user/getUserData`, async (route) => {
        await route.fulfill({ json: user });
      });
      //Juan is the firstname value of the token when decoded. See auth.setup.js to know
      //what data is included
      await page.getByRole("link", { name: "JUAN" }).click();

      expect(page.url()).toContain("/account");
    });
  });
});

function shouldNavigateTo(path, linkName) {
  test(`'${linkName}' should navigate to ${path}`, async ({ page }) => {
    await page.getByRole("link", { name: linkName }).click();

    expect(page.url()).toContain(path);
  });
}

test.describe("logged out", () => {
  setToLogOutState();

  shouldBeHidden("JUAN");
  shouldBeHidden("LOG OUT");

  shouldBeVisible("HOME");
  shouldBeVisible("LOG IN");
  shouldBeVisible("SIGNUP");
});

function shouldBeHidden(linkName) {
  test(`'${linkName}' should be hidden`, async ({ page }) => {
    await expect(page.getByRole("link", { name: linkName })).toBeHidden();
  });
}

function shouldBeVisible(linkName) {
  test(`'${linkName}' should be visible`, async ({ page }) => {
    await expect(page.getByRole("link", { name: linkName })).toBeVisible();
  });
}

test.describe("logged in", () => {
  shouldBeVisible("JUAN");
  shouldBeVisible("LOG OUT");

  shouldBeHidden("SIGNUP");
  shouldBeHidden("LOGIN");
});
