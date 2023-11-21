// @ts-check
import { expect, test } from "@playwright/test";
import { setToLogOutState } from "../../test/testUtils";
import user from "./../../mockDatas/user.json";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("navigation", () => {
  test.describe("logged out", () => {
    setToLogOutState();

    shouldNavigateTo("/", "Home");
    shouldNavigateTo("/login", "Log-in");
    shouldNavigateTo("/signup", "Sign up");
  });

  test.describe("logged in", () => {
    test("'Log-out' to log out and navigate to /", async ({ page }) => {
      await page.getByText("Log-out").click();

      expect(page.url()).toContain("/");
    });

    test("'Juan' navigate to /account", async ({ page }) => {
      await page.route(`/api/user/getUserData`, async (route) => {
        await route.fulfill({ json: user });
      });
      //Juan is the firstname value of the token when decoded. See auth.setup.js to know
      //what data is included
      await page.getByRole("link", { name: "Juan" }).click();

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

  //Juan is the username of the user
  shouldBeHidden("Juan");
  shouldBeHidden("Log-out");

  shouldBeVisible("Home");
  shouldBeVisible("Log-in");
  shouldBeVisible("Sign up");
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
  shouldBeVisible("Juan");
  shouldBeVisible("Log-out");

  shouldBeHidden("Sign up");
  shouldBeHidden("Log-in");
});

test.describe("wide viewport", () => {
  test("menu icon should be hidden", async ({ page }) => {
    const menuIcon = page.getByAltText("Menu Icon");

    await expect(menuIcon).toBeHidden();
  });
});

test.describe("small viewport", () => {
  let menuIcon;
  test.beforeEach(({ page }) => {
    menuIcon = page.getByAltText("Menu Icon");
  });

  test.use({
    viewport: { width: 479, height: 900 },
  });

  test("menu icon should be visible", async ({ page }) => {
    await expect(menuIcon).toBeVisible();
  });

  test("menu icon click should open navbar overlay", async ({ page }) => {
    const navbarOverlay = page.getByRole("dialog");

    await menuIcon.click();

    await expect(navbarOverlay).toBeVisible();
  });
});
