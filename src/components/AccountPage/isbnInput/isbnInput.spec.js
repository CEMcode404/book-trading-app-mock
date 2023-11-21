// @ts-check
import { expect, test } from "@playwright/test";

import user from "../../../mockDatas/user.json";
import searchBooks from "../../../mockDatas/books.json";
import transaction from "../../../mockDatas/transaction.json";

let selectInputType;
test.beforeEach(async ({ page }) => {
  selectInputType = page.locator(".isbn-input__select");

  await page.route(`/api/user/getUserData`, async (route) => {
    await route.fulfill({ json: user });
  });
  await page.route(
    `/api/bookTransactions/getUserTransactions?*`,
    async (route) => {
      await route.fulfill({ json: [transaction] });
    }
  );

  await page.goto("/account");
  await page
    .getByLabel("table of contents")
    .getByText("My Transaction")
    .click();
  await page.locator(".my-transaction__add-bttn-wrapper").click();
});

test.describe("Select ISBN Input Mode", () => {
  let isbnInput, titleInput;
  test.beforeEach(async ({ page }) => {
    isbnInput = page.getByPlaceholder("Manually input ISBN");
    titleInput = page.getByPlaceholder("Find ISBN by title");
  });

  test("Selecting 'isbn' should switch to manual isbn input mode", async () => {
    await selectInputType.selectOption("isbn");

    await expect(isbnInput).toBeVisible();
    await expect(titleInput).toBeHidden();
  });

  test("Selecting back to 'title' should switch to title input mode", async () => {
    await selectInputType.selectOption("isbn");
    await selectInputType.selectOption("title");

    await expect(titleInput).toBeVisible();
    await expect(isbnInput).toBeHidden();
  });
});

test.describe("ISBN Search Bar", () => {
  let isbnCards;
  test.beforeEach(async ({ page }) => {
    isbnCards = page.locator(".isbn-search-result-card");

    await page.route(`/api/books/*`, async (route) => {
      await route.fulfill({ json: searchBooks });
    });
    await selectInputType.selectOption("title");
    await page.getByPlaceholder("Find ISBN by title").fill("React");
  });

  test("Search Bar should show 10 matched titles with their isbn", async () => {
    await expect(isbnCards).toHaveCount(10);
  });

  test("Isbn card click should select isbn and show selected isbn card", async ({
    page,
  }) => {
    const selectedIsbnCard = page.locator(".isbn-input__selected-isbn-card");

    await isbnCards.first().click();

    await expect(selectedIsbnCard).toBeVisible();
  });

  test("Selected isbn card close button click should deselect isbn", async ({
    page,
  }) => {
    const selectedIsbnCard = page.locator(".isbn-input__selected-isbn-card");
    const closeButton = page.getByRole("dialog").getByText("+");

    await isbnCards.first().click();
    await closeButton.click();

    await expect(selectedIsbnCard).toBeHidden();
  });
});
