// @ts-check
import { expect, test } from "@playwright/test";

import transaction from "../../../mockDatas/transaction.json";
import user from "../../../mockDatas/user.json";

test("Add transaction button click should open a form", async ({ page }) => {
  const form = page.getByRole("dialog");

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

  await expect(form).toBeVisible();
});
