// @ts-check
import { expect, test } from "@playwright/test";
import "dotenv/config";

import transaction from "../../mockDatas/transaction.json";
import searchBooks from "../../mockDatas/books.json";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has title as image", async ({ page }) => {
  const img = page.getByAltText("booktrading.com");

  await expect(img).toBeVisible();
});

test.describe("search bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`/api/books/*`, async (route) => {
      await route.fulfill({ json: searchBooks });
    });

    await page.route(
      `/api/bookTransactions/getFeaturedTransactions`,
      async (route) => {
        await route.fulfill({ json: [transaction] });
      }
    );
  });

  test("has 10 results if valid input", async ({ page }) => {
    await page.getByPlaceholder("Find books").fill("Webster");

    const list = page.locator(".homepage__search-result-list");

    await expect(list).toHaveCount(10);
  });

  test("navigate to search results page when a search book is click", async ({
    page,
  }) => {
    await page.getByPlaceholder("Find books").fill("Webster");
    await page.locator(".homepage__search-result-list").first().click();

    expect(page.url()).toContain("/search-results");
  });

  test("results is not visible if invalid input or no data found", async ({
    page,
  }) => {
    await page.getByPlaceholder("Find books").fill("");
    const list = page.locator(".homepage__search-result-list");

    await expect(list).toHaveCount(0);
  });
});
