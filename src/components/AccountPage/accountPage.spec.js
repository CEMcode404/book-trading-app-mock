// @ts-check
import { expect, test } from "@playwright/test";

import transaction from "../../mockDatas/transaction.json";
import user from "../../mockDatas/user.json";

test.beforeEach(async ({ page }) => {
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
});

test("'My Details' click should reveal My Details section", async ({
  page,
}) => {
  const myDetailsSection = page.locator(".my-details");

  await page.getByLabel("table of contents").getByText("My Details").click();

  await expect(myDetailsSection).toBeVisible();
});

test("'My Transactions' click should reveal My transactions section", async ({
  page,
}) => {
  const myTransactionSection = page.locator(".my-transaction");

  await expect(myTransactionSection).toBeVisible();
});
