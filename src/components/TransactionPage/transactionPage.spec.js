// @ts-check
import { expect, test } from "@playwright/test";

import searchBooks from "../../mockDatas/books.json";
import transaction from "../../mockDatas/transaction.json";

let chatBox, imageSlider, imageSliderImg;
test.beforeEach(async ({ page }) => {
  chatBox = page.locator(".chat-box");
  imageSlider = page.getByRole("dialog");
  imageSliderImg = page.locator(".image-slider__img");

  await page.route(`/api/books/*`, async (route) => {
    await route.fulfill({ json: searchBooks });
  });
  await page.route(
    `/api/bookTransactions/getFeaturedTransactions`,
    async (route) => {
      await route.fulfill({ json: [transaction] });
    }
  );
  await page.route(`/api/bookTransactions/getTransaction/*`, async (route) => {
    await route.fulfill({ json: transaction });
  });
  await page.goto("/");
  await page.getByPlaceholder("Find book").fill("react");
  await page.locator(".homepage__search-result-list").first().click();
  await page.locator(".book-sale-card").first().click();
});

test("'Chat Owner' button click should open chatbox", async ({ page }) => {
  await page.getByRole("button", { name: "Chat Owner" }).click();

  await expect(chatBox).toBeVisible();
});

test("Image click should open image slider", async ({ page }) => {
  await imageSliderImg.first().click();

  await expect(imageSlider).toBeVisible();
});

test("Image Slider backdrop click should close image slider", async ({
  page,
}) => {
  await imageSliderImg.first().click();
  await page.locator("#root").click({ position: { x: 5, y: 5 } });

  await expect(imageSlider).toBeHidden();
});
