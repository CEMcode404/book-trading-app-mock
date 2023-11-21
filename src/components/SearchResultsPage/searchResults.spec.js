// @ts-check
import { expect, test } from "@playwright/test";

import transaction from "../../mockDatas/transaction.json";
import searchBooks from "../../mockDatas/books.json";

const defaultHeight = 400;
let showmoreButton, showlessButton;
test.beforeEach(async ({ page }) => {
  showlessButton = page.getByText("Show less");
  showmoreButton = page.getByText("Show more");

  await page.route(`/api/books/*`, async (route) => {
    await route.fulfill({ json: searchBooks });
  });
  await page.route(
    `/api/bookTransactions/getFeaturedTransactions`,
    async (route) => {
      await route.fulfill({ json: [transaction] });
    }
  );
  await page.goto("/");
  await page.getByPlaceholder("Find book").fill("react");
  await page.locator(".homepage__search-result-list").first().click();
});

test("'Show more' click should show hidden details", async ({ page }) => {
  await showmoreButton.click();
  await page.waitForTimeout(2000);

  //Need to define and get height here to get proper element height
  const textContentHeight = (
    await page
      .getByRole("main")
      .locator("div")
      .filter({
        hasText: "Title:React in Action",
      })
      .nth(3)
      .boundingBox()
  )?.height;

  expect(textContentHeight).toBeGreaterThan(defaultHeight);
});

test("'Show less' click should hide details", async ({ page }) => {
  await showmoreButton.click();
  await showlessButton.click();
  await page.waitForTimeout(2000);
  const textContentHeight = (
    await page
      .getByRole("main")
      .locator("div")
      .filter({
        hasText: "Title:React in Action",
      })
      .nth(3)
      .boundingBox()
  )?.height;

  expect(textContentHeight).toBe(defaultHeight);
});

test("'Show more' click should switch to 'Show less'", async ({ page }) => {
  await showmoreButton.click();

  await expect(showmoreButton).toBeHidden();
  await expect(showlessButton).toBeVisible();
});

test("'Show less' click should switch to 'Show more'", async ({ page }) => {
  await showmoreButton.click();
  await showlessButton.click();

  await expect(showlessButton).toBeHidden();
  await expect(showmoreButton).toBeVisible();
});

test("Book Card click should navigate to transaction page", async ({
  page,
}) => {
  await page.locator(".book-sale-card").first().click();

  expect(page.url()).toContain("/transaction");
});
