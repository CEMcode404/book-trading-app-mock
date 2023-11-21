// @ts-check
import { expect, test } from "@playwright/test";
import reviews from "../../mockDatas/reviews.json";

test.beforeEach(async ({ page }) => {
  await page.route(`/api/review/getReviews`, async (route) => {
    await route.fulfill({ json: reviews });
  });
  await page.goto("/reviews");
});

test("Page number click should change page", async ({ page }) => {
  const firstReviewerOnSecondPage = page.getByText(reviews[5].name);

  await page
    .locator("li")
    .filter({ has: page.getByText("2", { exact: true }) })
    .click();

  await expect(firstReviewerOnSecondPage).toBeVisible();
});

test("Review cards should be less than 6 per page", async ({ page }) => {
  const cards = await page.locator(".review-card").count();

  expect(cards).toBeLessThan(6);
});
